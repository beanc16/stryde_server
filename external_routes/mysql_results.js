class MysqlResults
{
	constructor(name, results, error)
	{
		this._name = name;
		this._results = results;
		this._error = error;
	}
	
	get name()
	{
		return this._name;
	}
	
	get results()
	{
		return this._results;
	}
	
	get error()
	{
		return this._error;
	}
	
	set error(err)
	{
		this._error = err;
	}
	
	
	
	wasSuccessful()
	{
		if (this.results != null && this.error == null)
		{
			return true;
		}
		
		else if (this.error != null)
		{
			return false;
		}
	}
	
	wasNotSuccessful()
	{
		return !this.wasSuccessful();
	}
}





module.exports = (function()
{
	'use strict';
	
    return MysqlResults;
})();