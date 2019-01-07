import get from 'lodash/get';
import omit from 'lodash/omit';
import trimEnd from 'lodash/trimEnd';

/**
 * Takes an url and params and returns combined url
 * @param {String} url
 * @param {Object} params
 * e.g: withParams('/roots/:id', {id: 1}): '/roots/1'
 */

// tslint:disable-next-line:export-name typedef
const withParams = (url: string, params: object = {}): string => {
    let rest: object = { ...params };

    const urlWithParams: string = `${url}`
        .replace(/:([\w\d.]+)(\?)?/gim, (match: string, p1: string) => {
            const param: string = get(rest, p1);

            rest = omit(rest, p1);

            return param;
        })
        .replace('//', '/');

    return trimEnd(urlWithParams, '/');
};

// tslint:disable-next-line:export-name typedef
export { withParams };
