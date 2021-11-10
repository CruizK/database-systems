
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export default function Search(value, rows, properties = ['Name']) {
  const searchRegex = new RegExp(escapeRegExp(value), 'i');
  const filteredRows = rows.filter(row => {
    return Object.keys(row).some(field => {
      if(properties.indexOf(field) != -1) {
        return searchRegex.test(row[field].toString())
      }
      return false
    })

  });

  return filteredRows;
}