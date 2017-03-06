/**
 * Time tracking
 * @param  {String} category
 * @param  {String} variable
 * @param  {Number} value
 * @param  {String} [label='']
 */
export default function (category, variable, value, label = '') {
  if (typeof window.ga === 'undefined') {
    return
  }

  window.ga.getAll().forEach(tracker => {
    tracker.send('timing', category, variable, value, label)
  })
}
