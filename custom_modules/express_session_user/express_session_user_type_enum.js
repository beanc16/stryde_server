/**
 * expressUserTypeEnum
 * @type {
 *			{
 *				WEB: number,
 *          	APP: number,
 *
 *         		properties: {
 *					"0": {code: string, name: string, value: number},
 *          		"1": {code: string, name: string, value: number}
 *         		}
 *			}
 *       }
 */
const expressSessionUserTypeEnum = {
	// Enum types
	WEB: 0,
	APP: 1,

	// Enum properties
	properties: {
		0: { name: "Web User", value: 0, code: "WEB" },
		1: { name: "App User", value: 1, code: "APP" }
	}
};



module.exports = expressSessionUserTypeEnum;