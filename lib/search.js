'use server'

import siteData from "../data/data.json"
import * as cheerio from 'cheerio'; 

const DEV_MODE = true

const DEV_LIMITS = {
  MAX_USERNAMES: 2,
  MAX_SITES: 5,
  MAX_URLS: 20,
}

// Username search engine

const generateUserNames = (formData) => {
  const usernames = new Set();
  
  const name = formData.name || "";
  const email = formData.email || "";
  const keywords = formData.keywords || "";

  const lowerName = name.toLowerCase().trim();
  const parts = lowerName.split(/\s+/); 
  const firstName = parts[0] || "";
  const lastName = parts[1] || "";

  const emailUser = email.split("@")[0]?.toLowerCase() || "";

  // limpiar caracteres especiales
  const clean = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")   
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");

  const cleanFirst = clean(firstName);
  const cleanLast = clean(lastName);
  const cleanEmail = clean(emailUser);
  const cleanKeywords = clean(keywords);

  if (cleanFirst) usernames.add(cleanFirst);
  if (cleanEmail) usernames.add(cleanEmail);

  if (cleanFirst && cleanLast) {
    usernames.add(cleanFirst + cleanLast);
    usernames.add(cleanFirst + "_" + cleanLast);
  }
  
  if (cleanFirst && cleanKeywords) {
      usernames.add(cleanFirst + cleanKeywords);
      usernames.add(cleanFirst + "_" + cleanKeywords);
  }

  if (cleanFirst) {
    usernames.add(cleanFirst + "123");
    usernames.add(cleanFirst + "01");
    usernames.add(cleanFirst + Math.floor(Math.random() * 900 + 100));
  }

  return Array.from(usernames).filter((u) => u.length > 0);
}

const buildProfileUrls = (usernames) => {
  const results = []

  const sites = DEV_MODE
  ? siteData.slice(0, DEV_LIMITS.MAX_SITES)
  : siteData

  if (!siteData || !Array.isArray(siteData)) return results;

  for (const user of usernames ) {
    for (const site of sites) {
        const UrlPattern = site.pattern
        const finalPattern = UrlPattern.replace('{username}', user)
        results.push({
          site: site.name, 
          username: user,
          url: finalPattern
      });
    }  
  }
  return results
}

const testProfileUrl = async (urlObject) => {
    const start = performance.now()
    try {
        let response = await fetch(urlObject.url , {method: "HEAD"})

        if (!response.ok && (response.status !== 200)) {
            response = await fetch(urlObject.url, {method:"GET"})
        }

        const end = performance.now()
        const responseTime = end - start
        const status = response.status

        let exists = "unknown";

        if (status === 200) exists = "exists";
        else if (status === 404) exists = "not_found";
        else if (status === 302) exists = "redirect";
        else if (status === 403) exists = "private";
        else if (status === 429) exists = "rate_limited";

        return {
            site: urlObject.site,
            username: urlObject.username,
            url: urlObject.url,
            exists,
            status,
            responseTime
        }
    } catch(error) {
        const end = performance.now()
        const responseTime = end - start
        return {
            site: urlObject.site,
            username: urlObject.username,
            url: urlObject.url,
            exists: "unknown",
            status: 0,
            responseTime,
            error: error.message,
        };
    }       
}

export const searchUserNames = async (formData) => {
    const usernames = generateUserNames(formData);
    const urls = buildProfileUrls(usernames);
    return { usernames, urls }; 
}



// Google search engine

export const searchGoogle = async (data) => { 
  const { name, keywords, region } = data;

  const generateQueries = (name, keywords) => {
    const queries = [];
  
    queries.push(`"${name}"`); 
  
    if (Array.isArray(keywords)) {
      keywords.forEach(word => {
        
        queries.push(`"${name}" ${word}`);
      });
    }
    return queries;
  }

  const buildGoogleUrl = (query,region) => {
    const url = 'https://www.google.com/search'

    const params = new URLSearchParams({
    q: query,
    gl: region || "US"
  }) 

    return `${url}?${params.toString()}`      
  }

  const getGoogleHtml = async (url) => {
    try{
      const response = await fetch(url, {
      method: 'GET',
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"
      }
    }) 
    if (response.ok) {
      return await response.text()
    } else {
      console.log("Error status:", response.status)
      return ""
    }
    } catch (error){
    console.error("Error en fetch:", error)
    return ""
    }
  }
  
  // get the title,link & description from the html
  const parseGoogleResults = (html) => {
    if (!html) return [];

      const $ = cheerio.load(html)

      const pageTitle = $('title').text();
      console.log("📄 Título de la página:", pageTitle);
      
      const results = []

  $('.h3').each((index,element) => {

      const card = $(element);
      const titleElement = $(element)
      const linkElement = titleElement.parent('a')

      const anchor = titleElement.closest('a');

      const title = titleElement.text();
      const url = anchor.attr('href');


      if (title && url && url.startsWith('http') && !url.includes('google.com')) {
       
          results.push({
            title: title,
            snippet: " ",
            url: url,
            source: 'google'
          });
        
      }
    })
    const uniqueResults = results.filter((v,i,a)=>a.findIndex(t=>(t.url===v.url))===i);
      return uniqueResults
  }




    const queries = generateQueries(name,keywords)
    let allResults = []

for (const query of queries) {
  console.log("🔍 GOOGLE QUERY:", query)

  try{
  const url = buildGoogleUrl(query,region)
  const html = await getGoogleHtml(url);

  console.log("📄 HTML LENGTH:", html.length)

  const results = parseGoogleResults(html);
  console.log("✅ PARSED RESULTS:", results.length)

   allResults.push(...results)
  } catch(e) {
    console.error(`Error buscando query: ${query}`, e);
  }
   
}


  return allResults
}






export const searchSocialMedia = async (data) => { return [] }
export const searchLeaks = async (data) => { return [] }
export const searchPublicRecords = async (data) => { return [] }



export const runFullScan = async ({name, email, keywords, region}) => {

  let usernames = generateUserNames({
    name,
    email,
    keywords
  })

  if (DEV_MODE) {
    usernames = usernames.slice(0, DEV_LIMITS.MAX_USERNAMES)
  }
  
  let urls = buildProfileUrls(usernames)

  if (DEV_MODE) {
    urls = urls.slice(0, DEV_LIMITS.MAX_URLS)
  }

  const usernameResults = await Promise.all(urls.map(urlObj => testProfileUrl(urlObj)));

  const googleResults = await searchGoogle({ name, email, keywords, region })
  const socialMediaResults = await searchSocialMedia({ name, email, keywords, region })
  const leaksResults = await searchLeaks({ name, email, keywords, region })
  const publicRecordsResults = await searchPublicRecords({ name, email, keywords, region })

  return {
    google: googleResults,
    socialMedia: socialMediaResults,
    leaks: leaksResults,
    usernames: usernameResults,
    publicRecords: publicRecordsResults
  };
}