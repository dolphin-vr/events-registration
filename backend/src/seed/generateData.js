import { faker } from "@faker-js/faker";

export const generateEvent = () => {
	const event = {
    title: faker.company.catchPhrase(),
    description: faker.lorem.paragraph(),
    eventDate: faker.date.future({ years: 0.2 }),
    organizer: faker.company.name(),
  };
  return event;
};

export const generateParticipant = () => {
  const participant = {
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    dateOfBirth: faker.date.past({ years: 50, refDate: faker.defaultRefDate() }),
    heardFrom: faker.helpers.arrayElement(["Social media", "Friends", "Found myself"]),
  };
  return participant;
};
