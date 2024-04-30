import { PrismaClient, Prisma } from "@prisma/client";
import * as PeopleService from "@/services/People.Service";
import * as GroupServices from "@/services/Groups.Service";

const prisma = new PrismaClient();

export const getAll = async () => {
  try {
    return await prisma.event.findMany();
  } catch (error) {
    return false;
  }
};

export const getEvent = async (id: number) => {
  try {
    return await prisma.event.findFirst({ where: { id } });
  } catch (error) {
    return false;
  }
};

type EventsCreateData = Prisma.Args<typeof prisma.event, "create">["data"];
export const addEvent = async (data: EventsCreateData) => {
  try {
    return await prisma.event.create({ data });
  } catch (error) {
    return false;
  }
};

type EventsUpdateData = Prisma.Args<typeof prisma.event, "update">["data"];
export const updateEvent = async (id: number, data: EventsUpdateData) => {
  try {
    return await prisma.event.update({ where: { id }, data });
  } catch (error) {
    return false;
  }
};

export const removeEvent = async (id: number) => {
  try {
    return await prisma.event.delete({ where: { id } });
  } catch (error) {
    return false;
  }
};

/*
  ID evento = 5
    - Grupo A
    -- Aislan
    -- Débora
    -- Augusto

    - Grupo B
    -- Maria
    -- Cotinha
    -- Roseli
    
    - Grupo C
    -- Julinho
    -- Sabrina
    -- Luiz Alexandre
    -- Luiz Carlos

  */

export const doMatches = async (id: number): Promise<boolean> => {
  const eventItem = await prisma.event.findFirst({
    where: { id },
    select: { grouped: true },
  });
  if (eventItem) {
    const peopleList = await PeopleService.getPerson({
      id_event: id,
    });
    if (peopleList && Array.isArray(peopleList)) {
      let sortedList: { id: number; matche: number }[] = [];
      let sortable: number[] = [];

      let attempts = 0;
      const maxAttempts = peopleList.length;
      let keepTrying = true;

      while (keepTrying && attempts < maxAttempts) {
        
      }

      /*
      if (attempts < maxAttempts) {
        for (const i in sortedList) {
          await PeopleService.updatePerson(
            {
              id: sortedList[i].id,
              id_event: id,
            },
            { matched: "" }, // TODO: Criar o encryptMatch()
          );
        }
        return true;
      }
      */
    }
  }

  return false; //! TEMPORÁRIO
};
