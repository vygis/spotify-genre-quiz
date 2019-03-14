import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import { blue, green, red } from 'chalk';

console.info(blue('Generating Webpack bundles'));

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.error(red(err));
    return 1;
  }
  console.log(stats);
  console.log(green('Webpack bundles generated'));
  return 0;
});
