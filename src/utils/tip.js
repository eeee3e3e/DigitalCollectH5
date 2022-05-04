import { Notify } from 'vant'

const defaultOptions = {
  duration: 2000,
  color: '#ffffff',
  background: '#5484ff',
}

Notify.setDefaultOptions(defaultOptions)

function mergeOptions(options) {
  if (typeof options === 'string') {
    options = { message: options }
  }
  return options
}

export default function tip(options) {
  Notify(mergeOptions(options));
}

tip.error = function errorTip(options) {
  const _options = mergeOptions(options)
  _options.background = '#ff976a'
  Notify(_options);
}
