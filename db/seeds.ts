import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  for (let i = 1; i < 6; i++) {
    await db.user.create({
      data: {
        name: "test " + i,
        email: "test" + i + "@meetup.com",
        hashedPassword:
          "JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJERXZ0xUclhmUXdmUlFhQk9iR1NJL3ckamlTQmVmMTNha1NTcVV1S0ZWWUxRREZxcFF6b3JpVC9jcmtmTGFDQmVnbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      },
    })
  }
}

export default seed
