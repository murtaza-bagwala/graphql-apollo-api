class ObjectHelper {
  static notAnEmptyObject(obj) {
    return obj && Object.entries(obj).length && obj.constructor === Object;
  }

  // Filter all falsy values ( "", 0, false, null, undefined )
  static filterEmptyVal(obj) {
    return Object.entries(obj)
      .reduce((a, [k, v]) => (v ? { ...a, [k]: v } : a), {});
  }

  static hasUndefinedProperty(obj) {
    const any = Object.entries(obj).find(([k]) => obj[k] === undefined);
    return !!any;
  }

  static filterObject(obj, query) {
    const filteredVal = obj.filter(query);
    return filteredVal;
  }
}

module.exports = ObjectHelper;
