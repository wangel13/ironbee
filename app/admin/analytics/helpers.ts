import prisma from "@/lib/prisma";
import { filter, map, orderBy, truncate } from "lodash";

export async function getStatistics() {
  // Еще возможные показатели
  // На какие сроки чаще всего расчитывают инвесторы
  // самые популярные патенты
  // на какие площади расчитывают инвесторы

  const [industries, areas, legalForms, numOfProjects, numOfUsers] =
    await prisma.$transaction([
      prisma.industry.findMany({
        include: {
          _count: {
            select: { Project: true },
          },
        },
      }),
      prisma.area.findMany({
        include: {
          _count: {
            select: { project: true },
          },
        },
      }),
      prisma.legalForm.findMany({
        include: {
          _count: {
            select: { project: true },
          },
        },
      }),
      prisma.project.count(),
      prisma.user.count(),
    ]);

  const topIndustriesByNumOfProjects = orderBy(
    filter(
      map(industries, (industry) => ({
        label: industry.name,
        labelShort: truncate(industry.name, { length: 38 }),
        numOfProjects: industry._count.Project,
      })),
      (i) => i.numOfProjects > 0
    ),
    ["numOfProjects"],
    ["desc"]
  );

  const topAreasByNumOfProjects = orderBy(
    filter(
      map(areas, (area) => ({
        label: area.name,
        labelShort: truncate(area.name, { length: 45 }),
        numOfProjects: area._count.project,
      })),
      (i) => i.numOfProjects > 0
    ),
    ["numOfProjects"],
    ["desc"]
  );

  const legalFormsByNumOfProjects = orderBy(
    filter(
      map(legalForms, (legalForm) => ({
        label: legalForm.name,
        labelShort: truncate(legalForm.name, { length: 45 }),
        numOfProjects: legalForm._count.project,
      })),
      (i) => i.numOfProjects > 0
    ),
    ["numOfProjects"],
    ["desc"]
  );

  return {
    topIndustriesByNumOfProjects,
    topAreasByNumOfProjects,
    legalFormsByNumOfProjects,
    numOfProjects,
    numOfUsers,
  };
}
