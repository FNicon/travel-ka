import * as faker from "faker"

exports.seed = function(knex: any) {
  return knex("schedule")
    .del()
    .then(() => {
      return knex("train").del()
    })
    .then(() => {
      const train = []
      for (let index = 0; index < 100; index++) {
        var manufacture_date = faker.date.past(10, "2012-01-01")
        var end_date = faker.date.past(10, "2018-10-03")
        while (manufacture_date > end_date) {
          end_date = faker.date.past(10, "2018-10-03")
        }
        train.push({
          name: faker.lorem.words(),
          manufacturedAt: manufacture_date,
          endedAt: end_date
        })
      }
      return knex("train").insert(train)
    })
    .then(() => {
      return knex("train")
        .pluck("id")
        .then((trainIds: any) => {
          const schedule = []
          for (let index = 0; index < 200; index++) {
            var depart = faker.date.past(10, "2012-01-01")
            var x = Math.floor(Math.random() * 10 + 1)
            var arrive = new Date(depart.getTime() + x * 3600000)
            schedule.push({
              trainId: faker.random.arrayElement(trainIds),
              source: faker.lorem.words(),
              destination: faker.lorem.words(),
              departedAt: depart,
              arrivedAt: arrive
            })
          }
          return knex("schedule").insert(schedule)
        })
    })
}
