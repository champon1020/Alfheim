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


import * as runtime from '../runtime';
import {
    DeleteArticleRequestBody,
    DeleteArticleRequestBodyFromJSON,
    DeleteArticleRequestBodyToJSON,
    DeleteImagesRequestBody,
    DeleteImagesRequestBodyFromJSON,
    DeleteImagesRequestBodyToJSON,
    InlineResponse200,
    InlineResponse200FromJSON,
    InlineResponse200ToJSON,
    InlineResponse2001,
    InlineResponse2001FromJSON,
    InlineResponse2001ToJSON,
    InlineResponse2002,
    InlineResponse2002FromJSON,
    InlineResponse2002ToJSON,
    InlineResponse2003,
    InlineResponse2003FromJSON,
    InlineResponse2003ToJSON,
    InlineResponse2004,
    InlineResponse2004FromJSON,
    InlineResponse2004ToJSON,
    PostArticleRequestBody,
    PostArticleRequestBodyFromJSON,
    PostArticleRequestBodyToJSON,
    UpdateArticleRequestBody,
    UpdateArticleRequestBodyFromJSON,
    UpdateArticleRequestBodyToJSON,
    UpdateArticleStatusRequestBody,
    UpdateArticleStatusRequestBodyFromJSON,
    UpdateArticleStatusRequestBodyToJSON,
} from '../models';

export interface ApiV3GetArticleIdIdGetRequest {
    id: string;
}

export interface ApiV3GetArticlesGetRequest {
    p: number;
}

export interface ApiV3GetArticlesTagTagGetRequest {
    p: number;
    tag: string;
}

export interface ApiV3GetArticlesTitleTitleGetRequest {
    p: number;
    title: string;
}

export interface ApiV3PrivateDeleteArticleDeleteRequest {
    deleteArticleRequestBody: DeleteArticleRequestBody;
}

export interface ApiV3PrivateDeleteImagesDeleteRequest {
    deleteImagesRequestBody: DeleteImagesRequestBody;
}

export interface ApiV3PrivateGetArticleIdIdGetRequest {
    id: string;
}

export interface ApiV3PrivateGetArticlesGetRequest {
    p: number;
}

export interface ApiV3PrivateGetDraftsGetRequest {
    p: number;
}

export interface ApiV3PrivateGetImagesGetRequest {
    p: number;
}

export interface ApiV3PrivatePostArticlePostRequest {
    postArticleRequestBody: PostArticleRequestBody;
}

export interface ApiV3PrivatePostImagePostRequest {
    image: Blob;
}

export interface ApiV3PrivateUpdateArticlePutRequest {
    updateArticleRequestBody: UpdateArticleRequestBody;
}

export interface ApiV3PrivateUpdateArticleStatusPutRequest {
    updateArticleStatusRequestBody: UpdateArticleStatusRequestBody;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Return a public article by id.
     */
    async apiV3GetArticleIdIdGetRaw(requestParameters: ApiV3GetArticleIdIdGetRequest): Promise<runtime.ApiResponse<InlineResponse200>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiV3GetArticleIdIdGet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v3/get/article/id/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse200FromJSON(jsonValue));
    }

    /**
     * Return a public article by id.
     */
    async apiV3GetArticleIdIdGet(requestParameters: ApiV3GetArticleIdIdGetRequest): Promise<InlineResponse200> {
        const response = await this.apiV3GetArticleIdIdGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Return public articles.
     */
    async apiV3GetArticlesGetRaw(requestParameters: ApiV3GetArticlesGetRequest): Promise<runtime.ApiResponse<InlineResponse2001>> {
        if (requestParameters.p === null || requestParameters.p === undefined) {
            throw new runtime.RequiredError('p','Required parameter requestParameters.p was null or undefined when calling apiV3GetArticlesGet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.p !== undefined) {
            queryParameters['p'] = requestParameters.p;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v3/get/articles`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2001FromJSON(jsonValue));
    }

    /**
     * Return public articles.
     */
    async apiV3GetArticlesGet(requestParameters: ApiV3GetArticlesGetRequest): Promise<InlineResponse2001> {
        const response = await this.apiV3GetArticlesGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Return public articles by tag.
     */
    async apiV3GetArticlesTagTagGetRaw(requestParameters: ApiV3GetArticlesTagTagGetRequest): Promise<runtime.ApiResponse<InlineResponse2001>> {
        if (requestParameters.p === null || requestParameters.p === undefined) {
            throw new runtime.RequiredError('p','Required parameter requestParameters.p was null or undefined when calling apiV3GetArticlesTagTagGet.');
        }

        if (requestParameters.tag === null || requestParameters.tag === undefined) {
            throw new runtime.RequiredError('tag','Required parameter requestParameters.tag was null or undefined when calling apiV3GetArticlesTagTagGet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.p !== undefined) {
            queryParameters['p'] = requestParameters.p;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v3/get/articles/tag/{tag}`.replace(`{${"tag"}}`, encodeURIComponent(String(requestParameters.tag))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2001FromJSON(jsonValue));
    }

    /**
     * Return public articles by tag.
     */
    async apiV3GetArticlesTagTagGet(requestParameters: ApiV3GetArticlesTagTagGetRequest): Promise<InlineResponse2001> {
        const response = await this.apiV3GetArticlesTagTagGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Return public articles by title.
     */
    async apiV3GetArticlesTitleTitleGetRaw(requestParameters: ApiV3GetArticlesTitleTitleGetRequest): Promise<runtime.ApiResponse<InlineResponse2001>> {
        if (requestParameters.p === null || requestParameters.p === undefined) {
            throw new runtime.RequiredError('p','Required parameter requestParameters.p was null or undefined when calling apiV3GetArticlesTitleTitleGet.');
        }

        if (requestParameters.title === null || requestParameters.title === undefined) {
            throw new runtime.RequiredError('title','Required parameter requestParameters.title was null or undefined when calling apiV3GetArticlesTitleTitleGet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.p !== undefined) {
            queryParameters['p'] = requestParameters.p;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v3/get/articles/title/{title}`.replace(`{${"title"}}`, encodeURIComponent(String(requestParameters.title))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2001FromJSON(jsonValue));
    }

    /**
     * Return public articles by title.
     */
    async apiV3GetArticlesTitleTitleGet(requestParameters: ApiV3GetArticlesTitleTitleGetRequest): Promise<InlineResponse2001> {
        const response = await this.apiV3GetArticlesTitleTitleGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Return tags which belong to public articles.
     */
    async apiV3GetTagsGetRaw(): Promise<runtime.ApiResponse<InlineResponse2002>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v3/get/tags`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2002FromJSON(jsonValue));
    }

    /**
     * Return tags which belong to public articles.
     */
    async apiV3GetTagsGet(): Promise<InlineResponse2002> {
        const response = await this.apiV3GetTagsGetRaw();
        return await response.value();
    }

    /**
     * Delete an article with id.
     */
    async apiV3PrivateDeleteArticleDeleteRaw(requestParameters: ApiV3PrivateDeleteArticleDeleteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.deleteArticleRequestBody === null || requestParameters.deleteArticleRequestBody === undefined) {
            throw new runtime.RequiredError('deleteArticleRequestBody','Required parameter requestParameters.deleteArticleRequestBody was null or undefined when calling apiV3PrivateDeleteArticleDelete.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("BearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v3/private/delete/article`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: DeleteArticleRequestBodyToJSON(requestParameters.deleteArticleRequestBody),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete an article with id.
     */
    async apiV3PrivateDeleteArticleDelete(requestParameters: ApiV3PrivateDeleteArticleDeleteRequest): Promise<void> {
        await this.apiV3PrivateDeleteArticleDeleteRaw(requestParameters);
    }

    /**
     * Delete images.
     */
    async apiV3PrivateDeleteImagesDeleteRaw(requestParameters: ApiV3PrivateDeleteImagesDeleteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.deleteImagesRequestBody === null || requestParameters.deleteImagesRequestBody === undefined) {
            throw new runtime.RequiredError('deleteImagesRequestBody','Required parameter requestParameters.deleteImagesRequestBody was null or undefined when calling apiV3PrivateDeleteImagesDelete.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("BearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v3/private/delete/images`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: DeleteImagesRequestBodyToJSON(requestParameters.deleteImagesRequestBody),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete images.
     */
    async apiV3PrivateDeleteImagesDelete(requestParameters: ApiV3PrivateDeleteImagesDeleteRequest): Promise<void> {
        await this.apiV3PrivateDeleteImagesDeleteRaw(requestParameters);
    }

    /**
     * Return an article by id.
     */
    async apiV3PrivateGetArticleIdIdGetRaw(requestParameters: ApiV3PrivateGetArticleIdIdGetRequest): Promise<runtime.ApiResponse<InlineResponse200>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiV3PrivateGetArticleIdIdGet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("BearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v3/private/get/article/id/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse200FromJSON(jsonValue));
    }

    /**
     * Return an article by id.
     */
    async apiV3PrivateGetArticleIdIdGet(requestParameters: ApiV3PrivateGetArticleIdIdGetRequest): Promise<InlineResponse200> {
        const response = await this.apiV3PrivateGetArticleIdIdGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Return articles.
     */
    async apiV3PrivateGetArticlesGetRaw(requestParameters: ApiV3PrivateGetArticlesGetRequest): Promise<runtime.ApiResponse<InlineResponse2001>> {
        if (requestParameters.p === null || requestParameters.p === undefined) {
            throw new runtime.RequiredError('p','Required parameter requestParameters.p was null or undefined when calling apiV3PrivateGetArticlesGet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.p !== undefined) {
            queryParameters['p'] = requestParameters.p;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("BearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v3/private/get/articles`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2001FromJSON(jsonValue));
    }

    /**
     * Return articles.
     */
    async apiV3PrivateGetArticlesGet(requestParameters: ApiV3PrivateGetArticlesGetRequest): Promise<InlineResponse2001> {
        const response = await this.apiV3PrivateGetArticlesGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Fetch draft articles.
     */
    async apiV3PrivateGetDraftsGetRaw(requestParameters: ApiV3PrivateGetDraftsGetRequest): Promise<runtime.ApiResponse<InlineResponse2001>> {
        if (requestParameters.p === null || requestParameters.p === undefined) {
            throw new runtime.RequiredError('p','Required parameter requestParameters.p was null or undefined when calling apiV3PrivateGetDraftsGet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.p !== undefined) {
            queryParameters['p'] = requestParameters.p;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("BearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v3/private/get/drafts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2001FromJSON(jsonValue));
    }

    /**
     * Fetch draft articles.
     */
    async apiV3PrivateGetDraftsGet(requestParameters: ApiV3PrivateGetDraftsGetRequest): Promise<InlineResponse2001> {
        const response = await this.apiV3PrivateGetDraftsGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Fetch images.
     */
    async apiV3PrivateGetImagesGetRaw(requestParameters: ApiV3PrivateGetImagesGetRequest): Promise<runtime.ApiResponse<InlineResponse2003>> {
        if (requestParameters.p === null || requestParameters.p === undefined) {
            throw new runtime.RequiredError('p','Required parameter requestParameters.p was null or undefined when calling apiV3PrivateGetImagesGet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.p !== undefined) {
            queryParameters['p'] = requestParameters.p;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("BearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v3/private/get/images`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2003FromJSON(jsonValue));
    }

    /**
     * Fetch images.
     */
    async apiV3PrivateGetImagesGet(requestParameters: ApiV3PrivateGetImagesGetRequest): Promise<InlineResponse2003> {
        const response = await this.apiV3PrivateGetImagesGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Post an article.
     */
    async apiV3PrivatePostArticlePostRaw(requestParameters: ApiV3PrivatePostArticlePostRequest): Promise<runtime.ApiResponse<InlineResponse2004>> {
        if (requestParameters.postArticleRequestBody === null || requestParameters.postArticleRequestBody === undefined) {
            throw new runtime.RequiredError('postArticleRequestBody','Required parameter requestParameters.postArticleRequestBody was null or undefined when calling apiV3PrivatePostArticlePost.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("BearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v3/private/post/article`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PostArticleRequestBodyToJSON(requestParameters.postArticleRequestBody),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2004FromJSON(jsonValue));
    }

    /**
     * Post an article.
     */
    async apiV3PrivatePostArticlePost(requestParameters: ApiV3PrivatePostArticlePostRequest): Promise<InlineResponse2004> {
        const response = await this.apiV3PrivatePostArticlePostRaw(requestParameters);
        return await response.value();
    }

    /**
     * Register a image.
     */
    async apiV3PrivatePostImagePostRaw(requestParameters: ApiV3PrivatePostImagePostRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.image === null || requestParameters.image === undefined) {
            throw new runtime.RequiredError('image','Required parameter requestParameters.image was null or undefined when calling apiV3PrivatePostImagePost.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("BearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.image !== undefined) {
            formParams.append('image', requestParameters.image as any);
        }

        const response = await this.request({
            path: `/api/v3/private/post/image`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Register a image.
     */
    async apiV3PrivatePostImagePost(requestParameters: ApiV3PrivatePostImagePostRequest): Promise<void> {
        await this.apiV3PrivatePostImagePostRaw(requestParameters);
    }

    /**
     * Update an article.
     */
    async apiV3PrivateUpdateArticlePutRaw(requestParameters: ApiV3PrivateUpdateArticlePutRequest): Promise<runtime.ApiResponse<InlineResponse2004>> {
        if (requestParameters.updateArticleRequestBody === null || requestParameters.updateArticleRequestBody === undefined) {
            throw new runtime.RequiredError('updateArticleRequestBody','Required parameter requestParameters.updateArticleRequestBody was null or undefined when calling apiV3PrivateUpdateArticlePut.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("BearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v3/private/update/article`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateArticleRequestBodyToJSON(requestParameters.updateArticleRequestBody),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2004FromJSON(jsonValue));
    }

    /**
     * Update an article.
     */
    async apiV3PrivateUpdateArticlePut(requestParameters: ApiV3PrivateUpdateArticlePutRequest): Promise<InlineResponse2004> {
        const response = await this.apiV3PrivateUpdateArticlePutRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update the article status.
     */
    async apiV3PrivateUpdateArticleStatusPutRaw(requestParameters: ApiV3PrivateUpdateArticleStatusPutRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.updateArticleStatusRequestBody === null || requestParameters.updateArticleStatusRequestBody === undefined) {
            throw new runtime.RequiredError('updateArticleStatusRequestBody','Required parameter requestParameters.updateArticleStatusRequestBody was null or undefined when calling apiV3PrivateUpdateArticleStatusPut.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("BearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v3/private/update/article/status`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateArticleStatusRequestBodyToJSON(requestParameters.updateArticleStatusRequestBody),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Update the article status.
     */
    async apiV3PrivateUpdateArticleStatusPut(requestParameters: ApiV3PrivateUpdateArticleStatusPutRequest): Promise<void> {
        await this.apiV3PrivateUpdateArticleStatusPutRaw(requestParameters);
    }

    /**
     * Verify token.
     */
    async apiV3VerifyPostRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("BearerAuth", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v3/verify`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Verify token.
     */
    async apiV3VerifyPost(): Promise<void> {
        await this.apiV3VerifyPostRaw();
    }

}