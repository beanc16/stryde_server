/**
 * encryptPassword
 * @param bcrypt
 * @param {String} password
 * @param {number} saltRounds
 * @return {Promise<*>}
 */
exports.encryptPassword = async function(bcrypt, password, saltRounds)
{
    return new Promise(async function (resolve, reject)
	{
		try
		{
			let encryptedPassword = await bcrypt.hash(password, saltRounds);
			resolve(encryptedPassword);
		}
		
		catch (err)
		{
			reject(err);
		}
	});
};

/**
 * encryptedPasswordMatches
 * @param bcrypt
 * @param {String} password
 * @param {String} encryptedPassword
 * @return {Promise<boolean>}
 */
exports.encryptedPasswordMatches = async function(bcrypt, password, encryptedPassword)
{
	return new Promise(async function (resolve, reject)
	{
		try
		{
			let doPasswordsMatch = await bcrypt.compare(password, encryptedPassword);
			resolve(doPasswordsMatch);
		}
		
		catch (err)
		{
			reject(err);
		}
	});
};