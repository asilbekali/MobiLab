export interface Admin {
  id: string;
  name: string;
}

export const admins: Admin[] =
  process.env.ADMINS?.split(",")
    .map((item) => {
      const [id, name] = item.trim().split("|");
      return { id: id?.trim(), name: name?.trim() || "Admin" };
    })
    .filter((admin) => admin.id) || [];

let currentAdminIndex = 0;

export function getNextAdmin(): Admin | null {
  if (admins.length === 0) return null;

  const admin = admins[currentAdminIndex];
  currentAdminIndex = (currentAdminIndex + 1) % admins.length;
  return admin;
}
