import { PrismaClient, Prisma } from "@prisma/client";
import * as EventsService from "@/services/Events.Service";

const prisma = new PrismaClient();

export const getAll = async (id_event: number) => {
  try {
    return await prisma.eventGroup.findMany({ where: { id_event } });
  } catch (error) {
    return false;
  }
};

type GetOneFilters = { id: number; id_event?: number };
export const getGroup = async (filters: GetOneFilters) => {
  try {
    return await prisma.eventGroup.findFirst({ where: filters });
  } catch (error) {
    return false;
  }
};

type GroupsCreateData = Prisma.Args<typeof prisma.eventGroup, "create">["data"];
export const addGroup = async (data: GroupsCreateData) => {
  try {
    if (!data.id_event) return false;

    const event = await EventsService.getEvent(data.id_event);
    if (!event) return false;

    return await prisma.eventGroup.create({ data });
  } catch (error) {
    return false;
  }
};

type UpdateFilters = { id: number; id_event?: number };
type GroupUpdateData = Prisma.Args<typeof prisma.eventGroup, "update">["data"];
export const updateGroup = async (
  filters: UpdateFilters,
  data: GroupUpdateData,
) => {
  try {
    return await prisma.eventGroup.update({ where: filters, data });
  } catch (error) {
    return false;
  }
};

type GroupDeleteData = { id: number; id_event?: number };
export const removeGroup = async (filters: GroupDeleteData) => {
  try {
    return await prisma.eventGroup.delete({ where: filters });
  } catch (error) {
    return false;
  }
};
