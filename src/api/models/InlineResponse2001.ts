/* tslint:disable */
/* eslint-disable */
/**
 * argus
 * My blog
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Article,
    ArticleFromJSON,
    ArticleFromJSONTyped,
    ArticleToJSON,
    Pagenation,
    PagenationFromJSON,
    PagenationFromJSONTyped,
    PagenationToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2001
 */
export interface InlineResponse2001 {
    /**
     * 
     * @type {Array<Article>}
     * @memberof InlineResponse2001
     */
    articles: Array<Article>;
    /**
     * 
     * @type {Pagenation}
     * @memberof InlineResponse2001
     */
    pagenation: Pagenation;
}

export function InlineResponse2001FromJSON(json: any): InlineResponse2001 {
    return InlineResponse2001FromJSONTyped(json, false);
}

export function InlineResponse2001FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2001 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'articles': ((json['articles'] as Array<any>).map(ArticleFromJSON)),
        'pagenation': PagenationFromJSON(json['pagenation']),
    };
}

export function InlineResponse2001ToJSON(value?: InlineResponse2001 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'articles': ((value.articles as Array<any>).map(ArticleToJSON)),
        'pagenation': PagenationToJSON(value.pagenation),
    };
}


