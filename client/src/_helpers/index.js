const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

const setCategoryColor = (category) => {
    let color = ''
    switch(category){
      case 'emotional':
        color = 'bg-yellow-100'
        break
      case 'spiritual':
        color = 'bg-purple-100'
        break
      case 'personal':
        color = 'bg-pink-100'
        break
      case 'professional':
        color = 'bg-green-100'
        break
      case 'physical':
        color = 'bg-red-100'
        break
      case 'psychological':
        color = 'bg-teal-100'
        break
      default:
        color = ''
        break
    }
    return color

  }

export default {
    capitalize,
    setCategoryColor
}