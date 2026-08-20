const fs = require('fs');
require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
});

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];
const port = process.env.PORT || 4002;
const routeGroups = [
  ['Auth', '/api/auth'],
  ['Protected', '/api/profile'],
  ['Camera', '/cameras'],
  ['Danh mục camera', '/api/danh-muc-camera'],
  ['Danh mục cáp điện thoại', '/api/danhMucCapDienThoai'],
  ['Danh mục đơn vị', '/api/danh-muc-don-vi'],
  ['Danh mục chức vụ', '/api/danh-muc-chuc-vu'],
  ['Vị trí lắp đặt', '/api/vi-tri-lap-dat'],
  ['Thiết bị', '/api/thiet-bi'],
  ['Khu vực', '/api/khu-vuc'],
  ['Loại thiết bị', '/api/loai_thiet_bi'],
  ['Phiếu nhập', '/api/phieu_nhap'],
  ['Phiếu xuất', '/api/phieu_xuat'],
  ['Chi tiết phiếu nhập', '/api/chi_tiet_phieu_nhap'],
  ['Tổng hợp hệ thống thông tin', '/api/tonghop_hethong_thongtin'],
  ['Người dùng', '/api/users'],
  ['Trang chủ', '/api/home'],
  ['Upload', '/upload'],
  ['Đơn vị tính', '/api/don_vi_tinh'],
];

const document = {
  openapi: '3.0.0',
  info: {
    title: 'Camera App API',
    version: '1.0.0',
    description: 'API documentation for the Node.js Camera backend',
  },
  tags: routeGroups.map(([name]) => ({ name })),
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Local server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, document).then(() => {
  const swaggerSpec = JSON.parse(fs.readFileSync(outputFile, 'utf8'));

  for (const [path, operations] of Object.entries(swaggerSpec.paths || {})) {
    const group = routeGroups.find(([, prefix]) => path.startsWith(prefix));
    const tag = group ? group[0] : 'Khác';

    for (const operation of Object.values(operations)) {
      if (operation && typeof operation === 'object') {
        operation.tags = [tag];
        if (tag !== 'Auth') {
          operation.security = [{ bearerAuth: [] }];
        }
      }
    }
  }

  fs.writeFileSync(outputFile, `${JSON.stringify(swaggerSpec, null, 2)}\n`);
  console.log(`Swagger documentation generated at ${outputFile}`);
});
