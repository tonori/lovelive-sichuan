type RequestSuccessResponse<D> = {
	data : D
} & UniNamespace.RequestSuccessCallbackResult

type RequestGlobarProps<D = UniNamespace.RequestSuccessCallbackResult['data']> = Omit<UniNamespace.RequestOptions, 'success' | 'fail' | 'complete' | 'data' | 'url'> & {
	baseUri ?: string;
	checkSuccessFunc ?: (arg0 : RequestSuccessResponse<D>) => boolean
}

type MethodFunctionProps = {
	uri : string;
	loading ?: {
		showLoading ?: boolean;
		props ?: UniApp.ShowLoadingOptions
	};
} & Omit<UniNamespace.RequestOptions, 'url' | 'method' | 'success' | 'fail' | 'complete'>

export default class Request<R> {
	props : RequestGlobarProps<R> = {
		checkSuccessFunc: ({ statusCode }) => {
			return statusCode >= 200 && statusCode < 400
		}
	}

	constructor(props : Omit<RequestGlobarProps<R>, 'method'>) {
		this.props = props
	}

	get(props : MethodFunctionProps) {
		this.props.method = 'GET'
		return request({
			...this.props,
			...props
		})
	}

	post(props : MethodFunctionProps) {
		this.props.method = 'POST'
		return request({
			...this.props,
			...props
		})
	}

	put(props : MethodFunctionProps) {
		this.props.method = 'PUT'
		return request({
			...this.props,
			...props
		})
	}

	delete(props : MethodFunctionProps) {
		this.props.method = 'DELETE'
		return request({
			...this.props,
			...props
		})
	}
}

const request = <D = any>({ loading, checkSuccessFunc, baseUri, uri, ...requestProps } : MethodFunctionProps & RequestGlobarProps) => {
	return new Promise<RequestSuccessResponse<D>>((resolve, reject) => {
		if (loading.showLoading) {
			uni.showLoading(loading.props)
		}
		return uni.request({
			url: baseUri ? baseUri + uri : uri,
			...requestProps,
			success: (res : RequestSuccessResponse<D>) => {
				if (checkSuccessFunc(res)) {
					return resolve(res)
				} else {
					return reject(res)
				}
			},
			fail: (e) => {
				return reject(e)
			},
			complete: () => {
				if (loading.showLoading) {
					uni.hideLoading()
				}
			}
		})
	})

}