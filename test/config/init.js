require('dom-test');

global.assert = require('assert');
global.sinon = require('sinon');

{
  const registry = new Map();

  global.loader = {
    get(key) {
      return registry.get(key);
    },
    define(key, module) {
      registry.set(key, module);
    },
    async preload(key) {
    },
  };

  const Toolkit = require('../../src/core/toolkit.js');

  const consts = require('../../src/core/consts.js');
  const nodes = require('../../src/core/nodes.js');

  Object.assign(Toolkit.prototype, consts, nodes, {
    Diff: require('../../src/core/diff.js'),
    Lifecycle: require('../../src/core/lifecycle.js'),
    Patch: require('../../src/core/patch.js'),
    Plugins: require('../../src/core/plugins.js'),
    Reconciler: require('../../src/core/reconciler.js'),
    Renderer: require('../../src/core/renderer.js'),
    Sandbox: require('../../src/core/sandbox.js'),
    Service: require('../../src/core/service.js'),
    Template: require('../../src/core/template.js'),
    VirtualDOM: require('../../src/core/virtual-dom.js'),
    utils: require('../../src/core/utils.js'),
  });

  const toolkit = new Toolkit();

  toolkit.assert = (condition, message) => {
    if (!condition) {
      throw new Error(message);
    }
  };

  global.opr = {
    Toolkit: toolkit,
  };

  toolkit.configure({
    debug: true,
  });

  global.utils = require('./utils.js');

  global.CustomEvent = class {

    constructor(type, options) {
      this.type = type;
      this.detail = options.detail;
    }
  };

  global.suppressConsoleErrors = () => {

    let consoleError;
    beforeEach(() => {
      consoleError = console.error;
      console.error = () => {};
    });

    afterEach(() => {
      console.error = consoleError;
    });
  };
}
