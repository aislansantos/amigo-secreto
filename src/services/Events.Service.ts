import { PrismaClient, Prisma } from "@prisma/client";
import * as PeopleService from "@/services/People.Service";
import { encryptMatch } from "@/utils/match";
// import * as GroupServices from "@/services/Groups.Service";

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

export const doMatches = async (id: number): Promise<boolean> => {
  const eventItem = await prisma.event.findFirst({
    where: { id },
    select: { grouped: true },
  });
  if (eventItem) {
    const peopleList = await PeopleService.getAll({
      id_event: id,
    });
    if (peopleList && Array.isArray(peopleList)) {
      let sortedList: { id: number; match: number }[] = [];
      let sortable: number[] = [];

      let attempts = 0;
      const maxAttempts = peopleList.length;
      let keepTrying = true;

      while (keepTrying && attempts < maxAttempts) {
        keepTrying = false;
        attempts++;
        sortedList = [];
        sortable = peopleList.map((item) => item.id);

        for (const i in peopleList) {
          let sortableFiltred: number[] = sortable;
          if (eventItem.grouped) {
            sortableFiltred = sortable.filter((sortableItem) => {
              const sortablePerson = peopleList.find((item) => item.id === sortableItem);
              return peopleList[i].id_group !== sortablePerson?.id_group;
            });
          }

          if (sortableFiltred.length === 0 || (sortableFiltred.length === 1 && peopleList[i].id === sortableFiltred[0])) {
            keepTrying = true;
          } else {
            let sortedIndex = Math.floor(Math.random() * sortableFiltred.length);
            while (sortableFiltred[sortedIndex] === peopleList[i].id) {
              sortedIndex = Math.floor(Math.random() * sortableFiltred.length);
            }

            sortedList.push({
              id: peopleList[i].id,
              match: sortableFiltred[sortedIndex],
            });

            sortable = sortable.filter((item) => item !== sortableFiltred[sortedIndex]);
          }
        }
      }

      if (attempts < maxAttempts) {
        for (const i in sortedList) {
          await PeopleService.updatePerson(
            {
              id: sortedList[i].id,
              id_event: id,
            },
            { matched: encryptMatch(sortedList[i].match) },
          );
        }
        return true;
      }
    }
  }
  return false;
};
