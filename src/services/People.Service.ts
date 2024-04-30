import { PrismaClient, Prisma } from "@prisma/client";
import * as GroupsService from "@/services/Groups.Service";

const prisma = new PrismaClient();

type GetAllFilters = { id_event: number; id_group?: number };
export const getAll = async (filters: GetAllFilters) => {
  try {
    return await prisma.eventPeople.findMany({ where: filters });
  } catch (error) {
    return false;
  }
};

type GetOnePerson = {
  id_event: number;
  id_group?: number;
  id?: number;
  cpf?: string;
};
export const getPerson = async (filters: GetOnePerson) => {
  try {
    if (!filters.id && !filters.cpf) return false;
    return await prisma.eventPeople.findFirst({ where: filters });
  } catch (error) {
    return false;
  }
};

type PersonCreateData = Prisma.Args<typeof prisma.eventPeople, "create">["data"];
export const addPerson = async (data: PersonCreateData) => {
  try {
    if (!data.id_group) return false;

    const group = await GroupsService.getGroup({
      id: data.id_group,
      id_event: data.id_event,
    });

    if (!group) return false;

    return await prisma.eventPeople.create({ data });
  } catch (error) {
    return false;
  }
};

type PersonUpdateData = Prisma.Args<typeof prisma.eventPeople, "update">["data"];
type UpdateFilters = { id?: number; id_group?: number; id_event: number };
export const updatePerson = async (filters: UpdateFilters, data: PersonUpdateData) => {
  try {
    return await prisma.eventPeople.updateMany({ where: filters, data });
  } catch (error) {
    return false;
  }
};

type PersonDeleteData = { id: number; id_group?: number; id_event?: number };
export const removePerson = async (filters: PersonDeleteData) => {
  try {
    return await prisma.eventPeople.delete({ where: filters });
  } catch (error) {
    return false;
  }
};
