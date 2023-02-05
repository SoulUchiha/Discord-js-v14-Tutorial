const { dependencies } = require("../../package.json");
const ver = dependencies["discord.js"];
const { ActivityType } = require("discord.js");
const ms = require("ms");
const mongoose = require("mongoose");
const client = require("../../index");
const figlet = require("figlet");
const Table = require("cli-table3");

client.on("ready", async (c) => {
  const { user } = c;

  //Setting the presence
  setInterval(() => {
    user.setActivity({
      name: `Getting Ready!`,
      status: "idle",
      type: ActivityType.Playing,
    });
  }, ms("5s"));

  //Bot Server Table
  const table = new Table({
    head: ["Count", "Name", "ID"],
  });

  let SerialNo = 1;
  client.guilds.cache.forEach((guild) => {
    table.push([SerialNo, guild.name, guild.id]);
    SerialNo++;
  });

  //Bot Servers
  console.log("");
  console.log("——————————[BOT SERVERS]——————————".red.bold);

  console.log(table.toString());

  //Bot Information
  console.log("");
  console.log("——————————[BOT INFO]——————————".red.bold);
  console.log(
    `${
      client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
        ? "Users:"
        : "User:"
    }`.white.bold,
    `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`.yellow.bold,
    "||".white.bold,
    `${client.guilds.cache.size > 1 ? "Servers:" : "Server:"}`.white.bold,
    `${client.guilds.cache.size}`.yellow.bold
  );

  console.log(
    `Prefix: `.white.bold + `${c.prefix}`.yellow.bold,
    "||".white.bold,
    `Message Commands:`.white.bold,
    `${c.messageCommands.size}`.yellow.bold
  );

  console.log(
    `Prefix: `.white.bold + `/`.yellow.bold,
    "||".white.bold,
    `Slash Commands:`.white.bold,
    `${c.slashCommands.size}`.yellow.bold
  );

  console.log(
    `Total Commands = `.white.bold,
    `${c.messageCommands.size}`.yellow,
    `+`.white.bold,
    `${c.slashCommands.size}`.yellow,
    `=`.white.bold,
    `${c.messageCommands.size + c.slashCommands.size}`.yellow.bold
  );

  //console.log("Events:".white.bold, `${c.events.size}`.yellow.bold);

  console.log(
    "Invite Link:".white.bold,
    `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=1644971949559&scope=bot%20applications.commands`
      .magenta.bold
  );

  //Bot Specifications
  console.log("");
  console.log("——————————[BOT SPECS]——————————".red.bold);
  console.log(
    `Running on Node`.white.bold,
    `${process.version}`.magenta.bold,
    "on".white.bold,
    `${process.platform} ${process.arch}`.magenta.bold
  );

  console.log(
    "Memory:".white.bold,
    `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}`.magenta.bold,
    "MB".white.bold
  );
  console.log(
    "RSS:".white.bold,
    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`.magenta.bold,
    "MB".white.bold
  );

  console.log("Discord.js Verion:".white.bold, `${ver}`.magenta.bold);
  
  //Connections
  console.log("");
  console.log("——————————[Connections]——————————".red.bold);
  console.log(
    "✅ Successfully Connected To".white.bold,
    `${c.user.tag}`.red.bold,
    "(".white.bold,
    `${c.user.id}`.magenta.bold,
    ")".white.bold
  );

  //If there is no MongoDB URL
  if (!process.env.MONGO_URL) {
    console.warn(
      `[DATABASE] For database access, MongoDB URI, is required in .env file.`
        .red.bold
    );
    return;
  }

  //If there is MongoDB URL
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      console.log(
        "✅ Successfully Connected To".white.bold,
        `Mongoose Object Data Modeling (ODM)`.magenta.bold
      )
    )
    //In case of error
    .catch((err) => console.log(`Mongoose Error...`.red.bold, err));

  figlet(`${c.user.tag}`, function (err, data) {
    if (err) {
      console.log("Figlet Error...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
});