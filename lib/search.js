'use server'

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
}


export const searchPublicRecords = (data) => {
  return []
}

export const runFullScan = (formData) => {
  const googleResults = searchGoogle(formData)
  const socialMediaResults = searchSocialMedia(formData)
  const leaksResults = searchLeaks(formData)
  const userNamesResults = searchUserNames(formData)
  const publicRecordsResults = searchPublicRecords(formData)

  return {
    google: googleResults,
    socialMedia: socialMediaResults,
    leaks: leaksResults,
    usernames: userNamesResults,
    publicRecords: publicRecordsResults
  }
}
