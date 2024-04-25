import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type GetAllFilters = { id_event: number; id_group: number };
export const getAll = async (filters: GetAllFilters) => {
  try {
    return await prisma.eventPeople.findMany({ where: filters });
  } catch (error) {
    return false;
  }
};
