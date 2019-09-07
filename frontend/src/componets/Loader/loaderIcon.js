import React from 'react';

function LoaderIcon() {
	return (
		<div>
			<svg
				width='100px'
				height='100px'
				viewBox='0 0 100 100'
				preserveAspectRatio='xMidYMid'
				className='lds-double-ring'
				style={{ background: 'none' }}
			>
				<circle
					cx='50'
					cy='50'
					ng-attr-r='{{config.radius}}'
					ng-attr-stroke-width='{{config.width}}'
					ng-attr-stroke='{{config.c1}}'
					ng-attr-stroke-dasharray='{{config.dasharray}}'
					fill='none'
					strokeLinecap='round'
					r='45'
					strokeWidth='5'
					stroke='#376acd'
					strokeDasharray='70.68583470577035 70.68583470577035'
					transform='rotate(328.137 50 50)'
				>
					<animateTransform
						attributeName='transform'
						type='rotate'
						calcMode='linear'
						values='0 50 50;360 50 50'
						keyTimes='0;1'
						dur='1s'
						begin='0s'
						repeatCount='indefinite'
					/>
				</circle>
				<circle
					cx='50'
					cy='50'
					ng-attr-r='{{config.radius2}}'
					ng-attr-stroke-width='{{config.width}}'
					ng-attr-stroke='{{config.c2}}'
					ng-attr-stroke-dasharray='{{config.dasharray2}}'
					ng-attr-stroke-dashoffset='{{config.dashoffset2}}'
					fill='none'
					strokeLinecap='round'
					r='36'
					strokeWidth='5'
					stroke='#c3c3c3'
					strokeDasharray='56.548667764616276 56.548667764616276'
					strokeDashoffset='56.548667764616276'
					transform='rotate(-328.137 50 50)'
				>
					<animateTransform
						attributeName='transform'
						type='rotate'
						calcMode='linear'
						values='0 50 50;-360 50 50'
						keyTimes='0;1'
						dur='1s'
						begin='0s'
						repeatCount='indefinite'
					/>
				</circle>
			</svg>
		</div>
	);
}

export default LoaderIcon;
