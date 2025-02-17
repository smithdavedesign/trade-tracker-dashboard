const parseData = (data, mappings) => {
    return data.map(item => {
      const parsedItem = {};
      for (const [key, value] of Object.entries(mappings)) {
        parsedItem[key] = item[value];
      }
      return parsedItem;
    });
  };
  
  module.exports = parseData;
  