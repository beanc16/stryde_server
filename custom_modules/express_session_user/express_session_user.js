const expressSessionUserTypeEnum = require("./express_session_user_type_enum");



class ExpressUser
{
	constructor(userId, platformEnum)
	{
		this._userId = userId;
		this._platformEnum = platformEnum;
	}
	
	
	
    get userId()
    {
        return this._userId;
    }

    get platformEnum()
    {
        return this._platformEnum;
    }

    set userId(value)
    {
        this._userId = value;
    }

    set platformEnum(value)
    {
        this._platformEnum = value;
    }
	
	
	
	isWebUser()
	{
		return (this.platformEnum == expressSessionUserTypeEnum.WEB);
	}
	
	isAppUser()
	{
		return (this.platformEnum == expressSessionUserTypeEnum.APP);
	}
}