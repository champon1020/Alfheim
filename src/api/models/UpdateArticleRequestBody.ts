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
    Tag,
    TagFromJSON,
    TagFromJSONTyped,
    TagToJSON,
} from './';

/**
 * 
 * @export
 * @interface UpdateArticleRequestBody
 */
export interface UpdateArticleRequestBody {
    /**
     * 
     * @type {string}
     * @memberof UpdateArticleRequestBody
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateArticleRequestBody
     */
    title: string;
    /**
     * 
     * @type {Array<Tag>}
     * @memberof UpdateArticleRequestBody
     */
    tags: Array<Tag>;
    /**
     * 
     * @type {string}
     * @memberof UpdateArticleRequestBody
     */
    content: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateArticleRequestBody
     */
    imageUrl: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateArticleRequestBody
     */
    status: number;
}

export function UpdateArticleRequestBodyFromJSON(json: any): UpdateArticleRequestBody {
    return UpdateArticleRequestBodyFromJSONTyped(json, false);
}

export function UpdateArticleRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateArticleRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'tags': ((json['tags'] as Array<any>).map(TagFromJSON)),
        'content': json['content'],
        'imageUrl': json['image_url'],
        'status': json['status'],
    };
}

export function UpdateArticleRequestBodyToJSON(value?: UpdateArticleRequestBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'tags': ((value.tags as Array<any>).map(TagToJSON)),
        'content': value.content,
        'image_url': value.imageUrl,
        'status': value.status,
    };
}


