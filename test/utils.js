export const deleteAllRecordsFromModel = async model => {
  const instances = await model.findAll();
  instances.forEach(async instance => {
    instance.destroy();
    await instance.save();
  });
};
