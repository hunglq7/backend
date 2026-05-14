const pie=(req,res)=>{
    const { by } = req.query;
  // Mock data
  const pie = [
    { value: Math.floor(Math.random() * 90) + 10, code: "electronics" },
    { value: Math.floor(Math.random() * 90) + 10, code: "home_goods" },
    { value: Math.floor(Math.random() * 90) + 10, code: "apparel_accessories" },
    { value: Math.floor(Math.random() * 90) + 10, code: "food_beverages" },
    { value: Math.floor(Math.random() * 90) + 10, code: "beauty_skincare" },
    { value: Math.floor(Math.random() * 90) + 10, code: "Camera" },
    { value: Math.floor(Math.random() * 90) + 10, code: "Đơn vị" },
  ];
  res.json({ code: 200, success: true, result: pie, message: 'ok' });
}

const line=(req,res)=>{
   const { range } = req.body;
  let data = [];
  if (range === 'week') {
    data = Array.from({ length: 7 }, () => Math.floor(Math.random() * 900) + 100);
  } else if (range === 'month') {
    data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 900) + 100);
  } else {
    data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 900) + 100);
  }
  res.json({ code: 200, success: true, result: data, message: 'ok' });
}

module.exports={
    pie,
    line
}