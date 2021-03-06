/* ************************************************** *
 * ******************** Module Variables & Constants
 * ************************************************** */

var EventEmitter = require('events').EventEmitter,
  inherits = require('util').inherits;

const DEFAULT_ERROR_MESSAGE = "Internal server error!",
  DEFAULT_ERROR_LOCALE = "server.500.generic",
  DEFAULT_ERROR_STATUS_CODE = 500,
  DEFAULT_SANITIZE_OPTIONS = undefined;


/* ************************************************** *
 * ******************** RichError Class
 * ************************************************** */

class Remie {
  constructor(options = {}) {
    // Must require RichError here to access Remie's static methods.
    this.RichError = require('./RichError.js');
    this.set(options);

    return this;
  };

  createInternal(err, options = {}) {
    options.internalOnly = true;
    return new this.RichError(err, options, this);
  };

  copy(richError = {}, options) {
    return new this.RichError(richError.toObject(), options, this);
  };

  create(err, options = {}) {
    return new this.RichError(err, options, this)
  }

  get(key) {
    return this[key];
  }

  handle(event, data, options) {
    this.emit(event, data, options);
  }

  set(options = {}) {
    if(options.i18next) {
      this.i18next = options.i18next;
    }
    this.defaultErrorMessage = options.defaultErrorMessage || DEFAULT_ERROR_MESSAGE;
    this.defaultErrorLocale = options.defaultErrorLocale || DEFAULT_ERROR_LOCALE;
    this.defaultErrorStatusCode = options.defaultErrorStatusCode || DEFAULT_ERROR_STATUS_CODE;
    this.defaultSanitizeOptions = options.defaultSanitizeOptions || DEFAULT_SANITIZE_OPTIONS;
  }

  static get ERROR_LEVEL_FATAL() { return "fatal" }
  static get ERROR_LEVEL_ERROR() { return "error" }
  static get ERROR_LEVEL_WARN() { return "warn" }
  static get ERROR_LEVEL_INFO() { return "info" }
  static get ERROR_LEVEL_DEBUG() { return "debug" }
  static get ERROR_LEVEL_TRACE() { return "trace" }
  static get ON_CREATE_INTERNAL_MESSAGE() { return "create-internal-message" }

}

/* ************************************************** *
 * ******************** Require Other Classes
 * ************************************************** */

// Add the event emitter to the Remie class.
inherits(Remie, EventEmitter);

// Export Remie module.
module.exports = Remie;