const WizardScene = require("telegraf/scenes/wizard");
const Stage = require("telegraf/stage");
const { enter, leave } = Stage;
const session = require("telegraf/session");
const Markup = require("telegraf/markup");

function addStages(bot, scenes) {
  const stage = new Stage([...scenes]);

  bot.use(session());
  bot.use(stage.middleware());
}

function setEnterCommands(bot, scenes) {
  scenes.map(scene => {
    bot.command(scene.cmd, enter(scene.title));
  });
}

function connectWizardScenes(bot, flow) {
  let new_scenes = [];
  flow.scenes.map(scene => {
    let steps = [];

    scene.steps.map(step => {
      steps.push(ctx => {
        if (!step.answers) ctx.reply(step.question);
        else {
          let buttons = [];
          step.answers.map(x => buttons.push(Markup.callbackButton(x, x)));
          ctx.reply(step.question, Markup.inlineKeyboard(buttons).extra());
        }
        ctx.wizard.next();
      });
    });

    let new_scene = new WizardScene(scene.title, ...steps);
    new_scene.command("leave", leave());
    new_scenes.push(new_scene);
  });
  addStages(bot, new_scenes);
  setEnterCommands(bot, flow.scenes);
}

module.exports = {
  connectWizardScenes
};
