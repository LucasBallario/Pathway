'use server'

import { error } from "console"
import siteData from "../../data/data.json"






export const searchGoogle = (data) => {
  return []
}

export const searchSocialMedia = (data) => {
  return []
}

export const searchLeaks = (data) => {
  return []
}

// UserNames
export const searchUserNames = (formData) => {


  //funcion para crear nombre de usuarios
      const generateUserNames = () => {
                const usernames = new Set();

            const name = formData.name || "";
            const email = formData.email || "";
            const keywords = formData.keywords || "";

            const lowerName = name.toLowerCase().trim();
            const parts = lowerName.split(/\s+/); 
            const firstName = parts[0] || "";
            const lastName = parts[1] || "";

            const emailUser = email.split("@")[0]?.toLowerCase() || "";

            // Limpiar caracteres 
            const clean = (str) =>
              str
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "_")   
                .replace(/_+/g, "_")          // colapsa varios guiones bajos
                .replace(/^_+|_+$/g, "");     // saca _ al inicio y final

            const cleanFirst = clean(firstName);
            const cleanLast = clean(lastName);
            const cleanEmail = clean(emailUser);
            const cleanKeywords = clean(keywords);

            // combinaciones básicas
            if (cleanFirst) usernames.add(cleanFirst);
            if (cleanEmail) usernames.add(cleanEmail);

            usernames.add(cleanFirst + cleanLast);
            usernames.add(cleanFirst + "_" + cleanLast);
            usernames.add(cleanFirst + cleanKeywords);
            usernames.add(cleanFirst + "_" + cleanKeywords);

            usernames.add(cleanFirst + "123");
            usernames.add(cleanFirst + "01");
            usernames.add(cleanFirst + Math.floor(Math.random() * 900 + 100)); // combinacion con un numero random

            //Limpiar usernames vacíos
            return Array.from(usernames).filter((u) => u.length > 0);


              }


              // funcion que genera los urls
      const buildProfileUrls = (usernames) => {
                const results = []

                for (const user of usernames ) {
                  
                  for (const site of siteData) {

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
              const usernames = generateUserNames();
              const urls = buildProfileUrls(usernames);

              return usernames, urls


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
      }  
      
       catch(error) {
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


export const searchPublicRecords = (data) => {
  return []
}

export const runFullScan = async ({name,email,keywords,region}) => {

  const usernames = generateUserNames({
    name,
    email,
    keywords
  })
  const urls = buildProfileUrls(usernames)

  const usernameResults = await Promise.all(urls.map(urlObj => testProfileUrl(urlObj)));


  const googleResults = searchGoogle({ name, email, keywords, region })
  const socialMediaResults = searchSocialMedia({ name, email, keywords, region })
  const leaksResults = searchLeaks({ name, email, keywords, region })
  const publicRecordsResults = searchPublicRecords({ name, email, keywords, region })

  return {
    google: googleResults,
    socialMedia: socialMediaResults,
    leaks: leaksResults,
    usernames: usernameResults,
    publicRecords: publicRecordsResults
  };
}
