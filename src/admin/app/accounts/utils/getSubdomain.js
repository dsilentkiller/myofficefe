// utils/getTenant.js
//Extract Tenant Subdomain
export const getSubdomain = () => {
  const host = window.location.hostname; // e.g., abcd.localhost
  const parts = host.split(".");
  if (host.includes("localhost")) {
    return parts[0]; // abcd.localhost → abcd
  } else {
    return parts.length > 2 ? parts[0] : null; // abcd.myofficeai → abcd
  }
};

