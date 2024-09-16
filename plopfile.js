module.exports = function (plop) {
  plop.setGenerator('resource', {
    description:
      'Generate a NestJS resource (module, service, controller, command)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Resource name (e.g., User):',
      },
    ],
    actions: [
      // Generate Module
      {
        type: 'add',
        path: 'src/{{dashCase name}}/{{dashCase name}}.module.ts',
        templateFile: 'plop-templates/module.hbs',
      },
      // Generate Service
      {
        type: 'add',
        path: 'src/{{dashCase name}}/{{dashCase name}}.service.ts',
        templateFile: 'plop-templates/service.hbs',
      },
      // Generate Controller
      {
        type: 'add',
        path: 'src/{{dashCase name}}/{{dashCase name}}.controller.ts',
        templateFile: 'plop-templates/controller.hbs',
      },
      // Generate Command/Handler
      {
        type: 'add',
        path: 'src/{{dashCase name}}/{{dashCase name}}.command.ts',
        templateFile: 'plop-templates/command.hbs',
      },
    ],
  });
};
