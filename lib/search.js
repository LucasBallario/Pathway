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

const testProfileUrl = async (input) => {
    const start = performance.now()

    const targetUrl = typeof input === 'string' ? input : input.url; // detecta si no pasaron un objeto o string

    // datos auxiliares para el return
    const site = input.site || 'unknown';
    const username = input.username || 'unknown';

    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5"
  };

    try {
        let response = await fetch(targetUrl , {
          method: "HEAD",
          headers: headers
        })

        if (!response.ok && (response.status !== 200)) {
            response = await fetch(targetUrl, {
              method:"GET",
              headers:headers
            })
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
        else if (status === 999) exists = "private";

        return {
            site:site,
            username:username,
            url:targetUrl,
            exists,
            status,
            responseTime
        }
    } catch(error) {
        const end = performance.now()
        const responseTime = end - start

        return {
            site:site,
            username:username,
            url:targetUrl,
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

  const buildGoogleUrl = (query, region) => {
    const baseUrl = 'https://html.duckduckgo.com/html/';
    
    // Mapeo de regiones 
    const regionCode = region ? `xr-${region.toLowerCase()}` : 'us-en';

    const params = new URLSearchParams({
      q: query,
      kl: regionCode 
    });
    return `${baseUrl}?${params.toString()}`;
  }

  const getGoogleHtml = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        }
      });
      if (response.ok) {
        return await response.text();
      } else {
        console.log("Error status:", response.status);
        return "";
      }
    } catch (error) {
      console.error("Error en fetch:", error);
      return "";
    }
  }

  const parseGoogleResults = (html) => {
    if (!html) return [];
    const $ = cheerio.load(html);
    const results = [];

    console.log(`🔗 DEBUG: Analizando ${$('a').length} links crudos...`);

    // Buscar todos los links 
    $('a').each((index, element) => {
      const link = $(element);
      let url = link.attr('href');
      const title = link.text().trim();

      if (!url) return;

      // Los links suelen venir así: //duckduckgo.com/l/?uddg=https%3A%2F%2Fsitio.com...
      if (url.includes('uddg=')) {
          try {
            // Extraer lo que está después de "uddg=" y antes del siguiente "&"
            url = decodeURIComponent(url.split('uddg=')[1].split('&')[0]);
          } catch (e) {
            return;
          }
      }

      if (title && url.startsWith('http')) {
        if (!url.includes('duckduckgo.com') && 
            !url.includes('google.com') && 
            !url.includes('search_plus_one')) {
           
           // si los títulos son muy cortos suelen ser botones de atras o siguiente
           if (title.length > 5) {
               results.push({
                 title: title,
                 snippet: "Resultado web",
                 url: url,
                 source: 'google'
               });
           }
        }
      }
    });

    return results;
  }

  
  
  const queries = generateQueries(name, keywords);
  let allResults = [];

  console.log(`🔍 Iniciando búsqueda para: ${queries.join(', ')}`);

  for (const query of queries) {
     try {
       const url = buildGoogleUrl(query, region);
       const html = await getGoogleHtml(url);
       const results = parseGoogleResults(html);
       
       console.log(`   > Query "${query}" encontró ${results.length} resultados.`);
       allResults.push(...results);
       
       //  pausa para no saturar
       await new Promise(r => setTimeout(r, 500)); 

     } catch (e) {
       console.error(`Error procesando query: ${query}`, e);
     }
  }

  // Elimina duplicados exactos de URL
  const uniqueResults = allResults.filter((v,i,a)=>a.findIndex(t=>(t.url===v.url))===i);

  console.log(`✅ TOTAL FINAL: ${uniqueResults.length} resultados.`);

  return uniqueResults;
}




// Social media serch engine
export const searchSocialMedia = async ({name,email,keywords}) => { 

  const media = [
    {
      "name": "Twitter",
      "pattern": "https://twitter.com/{username}"
    },
    {
      "name": "Instagram",
      "pattern": "https://www.instagram.com/{username}"
    },
    {
      "name": "GitHub",
      "pattern": "https://github.com/{username}"
    },
    {
      "name": "LinkedIn",
      "pattern": "https://www.linkedin.com/in/{username}"
    },
    {
      "name": "Reddit",
      "pattern": "https://www.reddit.com/user/{username}"
    }
  ]

 const usernames = generateUserNames({name,email,keywords})
 console.log("👤 Usernames generados:", usernames);
if(!usernames || usernames.length === 0) {
  return []
} 

const candidates = []

for (const user of usernames) {

  for (const site of media) {
   const url = site.pattern.replace('{username}', user)
    
    const finalSite = user
    candidates.push({
      name: site.name,      
        url: url,              
        username: user
    })
    }
  }

  console.log(` Probando ${candidates.length} combinaciones de usuarios...`);
  const results = await Promise.all(
    candidates.map(async(candidate) => {
    const check = await testProfileUrl(candidate.url)

    console.log(` URL: ${candidate.url}`);
    console.log(`  Status: ${check.status} | Resultado: ${check.exists}`);

      return {
        ...candidate,
        ...check
      }
    })
    
  )

  const foundProfiles = results.filter(item => item.exists === 'exists' || item.exists === 'private')

  


  const finalResults = foundProfiles.map((profile) => {
    return {
      title: profile.name,
      snippet: 'Possible profile',
      url: profile.url,
      source: 'social'

    }
  })

  return finalResults
}







// data leaked search engine
export const searchLeaks = async (formData) => { 
    
  const dangerWords = ['password', 'dump', 'leak', 'db', 'combo', 'creds', 'hacked', 'breach'];
  
  const name = formData.name;
  const email = formData.email.toLowerCase();
  const keywords = formData.keywords ? formData.keywords.toLowerCase() : "";
  
  const usernames = generateUserNames({ name, email, keywords });

  const queries = [];

  const dangerGroup = `(${dangerWords.join(' OR ')})`;

  queries.push(`"${email}" ${dangerGroup}`);

  const topUsernames = usernames.slice(0, 5); // limita a los 5 usernames mas probables

  for (const user of topUsernames) {
      queries.push(`"${email}" ${dangerGroup}`);
  }


  

  console.log(` Leaks: Iniciando ${queries.length} búsquedas secuenciales...`);

  
  const buildLeakUrl = (query) => {
      const baseUrl = 'https://html.duckduckgo.com/html/';
      const params = new URLSearchParams({ q: query }); 
      return `${baseUrl}?${params.toString()}`;
  };

  const getLeakHtml = async (url) => {
      try {
          const response = await fetch(url, {
              headers: {
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
              }
          });
          return response.ok ? await response.text() : "";
      } catch (e) { return ""; }
  };

  const parseLeakResults = (html, originalQuery) => {
      if (!html) return [];
      const $ = cheerio.load(html);
      const results = [];

      $('a').each((index, element) => {
          const link = $(element);
          let url = link.attr('href');
          const title = link.text().trim();

          if (!url) return;
          // Limpia la de URL de DuckDuckGo
          if (url.includes('uddg=')) {
              try { url = decodeURIComponent(url.split('uddg=')[1].split('&')[0]); } catch (e) {}
          }

          //  FILTRO OSINT
          // Solo guarda si parece un leak real o viene de sitio sospechoso
          const isSuspiciousSite = url.includes('pastebin') || url.includes('github') || url.includes('anonfiles');
          const hasDangerWords = dangerWords.some(w => title.toLowerCase().includes(w));

          if (title && url.startsWith('http') && (isSuspiciousSite || hasDangerWords)) {
              results.push({
                  title: `Possible Leak: ${title}`,
                  snippet: `Found via query: ${originalQuery}`, // Contexto 
                  url: url,
                  source: 'leak' 
              });
          }
      });
      return results;
  };


  const allLeaks = [];

  for (const q of queries) {
      try {
          console.log(`🔎 Buscando leak: ${q}`);
          
          // Construye la URL usando la variable 'q'
          const url = buildLeakUrl(q);
          
          const html = await getLeakHtml(url);
          
          const found = parseLeakResults(html, q);
          
          if (found.length > 0) {
              allLeaks.push(...found);
          }

          // Espera 1.5s entre búsquedas
          await new Promise(r => setTimeout(r, 1500));

      } catch (error) {
          console.error(`Error buscando leak ${q}:`, error.message);
      }
  }

  // Limpiar duplicados por URL antes de devolver
  const uniqueLeaks = allLeaks.filter((v,i,a)=>a.findIndex(t=>(t.url===v.url))===i);

  console.log(`⚠️ Total Leaks Encontrados: ${uniqueLeaks.length}`);
  return uniqueLeaks;
}




// Search public records engine

export const searchPublicRecords = async (formData) => { 
  const name = formData.name
  const region = formData.region || ""

  const corporateTerms = 
    [
      "LLC", "Inc", "Corp", "Ltd", "S.A.", "S.R.L.", "SAS", 
      "Director", "Founder", "Owner", "Socio", "Gerente", "Dueño",
      "CUIT", "RUT", "RFC", "Tax ID", "Business"
    ]

    const governmentTerms = [
      "Boletin Oficial", "Official Gazette", "Sentencia", "Docket", 
      "Juzgado", "Court", "Multa", "Fine", "Padron", "Decreto",
      "Licitacion", "Nomination", "Judgment"
  ];

    const fileType = 
    [
      "pdf", "doc", "docx", "xls", "xlsx", "csv"
    ]

    const queries = []
    const corporateGroup = corporateTerms.join('OR')
    const governmentGroup = governmentTerms.join('OR')
    const fileTypeGroup = fileTypes.map(ext => `filetype:${ext}`).join(' OR ')

    queries.push(`${name} ${region} + ${corporateGroup}`)

    // El operador site:gov.* busca en dominios de gobierno de cualquier país
    queries.push(`"${name}" ${region} (site:gov.* OR site:gob.* OR ${governmentGroup})`)

    queries.push(`"${name}" ${region} (${fileTypeGroup})`)

    return queries
     
}









// Run full scan 


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
  console.log("📦 RESULTADOS RECIBIDOS:", googleResults.length);
  if (googleResults.length > 0) {
    console.log("🔎 Ejemplo:", JSON.stringify(googleResults[0], null, 2));
  }
  const socialMediaResults = await searchSocialMedia({ name, email, keywords, region })
  console.log("🐦 Redes Sociales encontradas:", socialMediaResults.length);
  if (socialMediaResults.length > 0) {
     console.log("Ejemplo red:", socialMediaResults[0]);
  }

  const leaksResults = await searchLeaks({ name, email, keywords, region })


  const publicRecordsResults = await searchPublicRecords({ name, email, keywords, region })

  return {
    google: googleResults,
    social: socialMediaResults,
    leaks: leaksResults,
    usernames: usernameResults,
    publicRecords: publicRecordsResults
  };
}