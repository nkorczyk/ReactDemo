import Bloodhound from 'bloodhound-js'
import courses_data from './courses_data'

var categoriesSource = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      // `states` is an array of state names defined in "The Basics"
      local: courses_data.reduce(function(local, course){
        return local.concat(course.categories)
      },[])
    });

export default categoriesSource;