const createUsersTable = require('./001-create-users-table');
const createCameraCategoryTable = require('./002-create-danh-muc-camera-table');
const updateUsersTable = require('./003-update-users-table');
const updateDanhMucCameraTable = require('./004-update-danh-muc-camera-table');
const createDanhMucDonViTable = require('./005-create-danh-muc-don-vi-table');
const createViTriLapDatTable = require('./006-create-vi-tri-lap-dat-table');
const allowNullEmail = require('./007-allow-null-email');
const createCamerasTable = require('./008-create-cameras-table');
const addDescriptionToUsers = require('./009-add-description-to-users');
const createDanhMucChucVuTable = require('./010-create-danh-muc-chuc-vu-table');
const createThietBiTable = require('./011-create-thiet-bi-table');

module.exports = [createUsersTable,
     createCameraCategoryTable,
      updateUsersTable, 
      updateDanhMucCameraTable,
       createDanhMucDonViTable, 
       createViTriLapDatTable, 
       allowNullEmail, 
       createCamerasTable, 
       addDescriptionToUsers, 
       createDanhMucChucVuTable,
       createThietBiTable
    ];
