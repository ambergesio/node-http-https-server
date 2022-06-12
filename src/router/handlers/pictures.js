module.exports = {
  pictures: (data, cb) => {
    cb(200, { error: false, message: "This is pictures endpoint", data: data});
  },
  all: (data, cb) => {
    cb(200, { error: false, message: "This is all pictures endpoint", data: data});
  },
  delete: (data, cb) => {
    cb(200, { error: false, message: "This is delete pictures endpoint", data: data});
  }
}
