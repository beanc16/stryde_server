/*
 * MySQL Queries
 */

/**
 * queryNoParams
 * Summary. Query a database with no parameters passed.
 * @param            res
 * @param            connection
 * @param {String}   query
 * @param {String}   errorMessage
 * @param {function} onSuccessCallback
 * @param {function} onErrorCallback
 */
exports.queryNoParams = function(res, connection, query, errorMessage,
                                 onSuccessCallback, onErrorCallback)
{
    connection.query(query, function(err, result, fields)
    {
        // Error
        if (err)
        {
            if (onErrorCallback != null)
            {
                onErrorCallback(errorMessage, connection,
                                query, onSuccessCallback);
            }

            else
            {
                exports.send404Error(res, errorMessage);
            }
        }

        // Success Callback
        if (onSuccessCallback != null)
        {
            onSuccessCallback(result, errorMessage, connection, onSuccessCallback);
        }

        else
        {
            exports.trySendQueryResults(res, result, errorMessage, false);
        }
    });
};

/**
 * queryNoParamsAsync
 * Summary. Query a database with no parameters passed.
 * @param            connection
 * @param {String}   query
 */
exports.queryNoParamsAsync = async function(connection, query)
{
    return new Promise(function (resolve, reject)
    {
        connection.query(query, function(err, result, fields)
        {
            // Error or There WERE NOT results from the query
            if (err || result.length <= 0)
            {
                reject(err);
            }

            // There WERE results from the query
            else
            {
                resolve(result);
            }
        });
    });
};


/**
 * queryWithParams
 * Summary. Query a database with parameters passed.
 * @param            res
 * @param            connection
 * @param {String}   query
 * @param {Array}    keywordParameters
 * @param {String}   errorMessage
 * @param {function} onSuccessCallback
 * @param {function} onErrorCallback
 */
exports.queryWithParams = function(res, connection, query, keywordParameters,
                                   errorMessage, onSuccessCallback, onErrorCallback)
{
    connection.query(query, keywordParameters, function(err, result, fields)
    {
        if (err)
        {
            if (onErrorCallback != null)
            {
                onErrorCallback(errorMessage, connection,
                                query, keywordParameters, onSuccessCallback);
            }

            else
            {
                exports.send404Error(res, errorMessage);
            }
        }

        if (onSuccessCallback != null)
        {
            onSuccessCallback(result, errorMessage, connection,
                              onSuccessCallback, onErrorCallback);
        }

        else
        {
            exports.trySendQueryResults(res, result, errorMessage, false);
        }
    });
};


/**
 * queryWithParamsAsync
 * Summary. Query a database with parameters passed.
 * @param            connection
 * @param {String}   query
 * @param {Array}    keywordParameters
 */
exports.queryWithParamsAsync = async function(connection, query, keywordParameters)
{
    return new Promise(async function (resolve, reject)
    {
        await connection.query(query, keywordParameters, async function(err, result, fields)
        {
            // Error || There WERE NOT results from the query
            if (err)
            {
                reject(err);
            }

            else if (result.length <= 0)
            {
                reject({
                    result: result,
                    error: "No results found",
                });
            }

            // There WERE results from the query
            else
            {
                resolve(result);
            }
        });
    });
};



/*
 * MySQL Stored Procedures
 */

/**
 * storedProcedureNoParams
 * Summary. Query a stored procedure in a database with no parameters passed.
 * @param            res
 * @param            connection
 * @param {String}   storedProcedureName
 * @param {String}   errorMessage
 * @param {function} onSuccessCallback
 * @param {function} onErrorCallback
 */
exports.storedProcedureNoParams = function(res, connection, storedProcedureName, errorMessage,
										   onSuccessCallback, onErrorCallback)
{
	const query = "call " + storedProcedureName + "()";
	exports.queryNoParams(res, connection, query, errorMessage, onSuccessCallback, onErrorCallback);
}

/**
 * storedProcedureNoParamsAsync
 * Summary. Query a stored procedure in a database with no parameters passed.
 * @param            connection
 * @param {String}   storedProcedureName
 */
exports.storedProcedureNoParamsAsync = function(connection, storedProcedureName)
{
    return new Promise(function (resolve, reject)
    {
		const query = "call " + storedProcedureName + "()";
		
		exports.queryNoParamsAsync(connection, query)
			.then(function(results)
			{
				resolve(results);
			})
			.catch(function(err)
			{
				reject(err);
			});
    });
};

/**
 * storedProcedureWithParams
 * Summary. Query a database with parameters passed.
 * @param            res
 * @param            connection
 * @param {String}   storedProcedureName
 * @param {Array}    keywordParameters
 * @param {String}   errorMessage
 * @param {function} onSuccessCallback
 * @param {function} onErrorCallback
 */
exports.storedProcedureWithParams = function(res, connection, storedProcedureName, keywordParameters,
											 errorMessage, onSuccessCallback, onErrorCallback)
{
	const questionMarks = getStoredProceduresParametersString(keywordParameters);
	const query = "call " + storedProcedureName + "(" + questionMarks + ")";
	exports.queryWithParams(res, connection, query, keywordParameters, errorMessage, onSuccessCallback, onErrorCallback);
}

/**
 * storedProcedureWithParamsAsync
 * Summary. Query a database with parameters passed.
 * @param            connection
 * @param {String}   storedProcedureName
 * @param {Array}    keywordParameters
 */
exports.storedProcedureWithParamsAsync = async function(connection, storedProcedureName, keywordParameters)
{
	return new Promise(function (resolve, reject)
    {
		const questionMarks = getStoredProceduresParametersString(keywordParameters);
		const query = "call " + storedProcedureName + "(" + questionMarks + ")";
		
		exports.queryWithParamsAsync(connection, query, keywordParameters)
			.then(function(results)
			{
				resolve(results);
			})
			.catch(function(err)
			{
				reject(err);
			});
    });
}




/*
 * Helpers
 */
 
function getStoredProceduresParametersString(parametersArray)
{
	const paramTemplate = "?, ";
	
	// Put "?, " into a string a number of times equal to the number of elements in parametersArray
	let finalParamsStr = paramTemplate.repeat(parametersArray.length);
	
	// Remove the last comma and space from the string
	let finalCommaIndex = finalParamsStr.lastIndexOf(",");
	return finalParamsStr.substring(0, finalCommaIndex);
}

/**
 * sendJsonResult
 * Summary. Send the result as a JSON object.
 * @param           res
 * @param           result
 * @param {Boolean} shouldLog
 */
exports.sendJsonResult = function(res, result, shouldLog)
{
    if (shouldLog)
    {
        console.log("Result:", result);
    }

    res.json(result);
};


/**
 * sendResult
 * Summary. Send the result.
 * @param           res
 * @param           result
 * @param {Boolean} shouldLog
 */
exports.sendResult = function(res, result, shouldLog)
{
    if (shouldLog)
    {
        console.log("Result:", result);
    }

    res.send(result);
};

/**
 * trySendQueryResults
 * @param res
 * @param result
 * @param {String} errorMessage
 * @param {Boolean} shouldLog
 */
exports.trySendQueryResults = function(res, result, errorMessage, shouldLog)
{
    // There WERE NOT results from the query
    if (result.length <= 0)
    {
        exports.send404Error(res, errorMessage);
    }

    // There WERE results from the query
    else
    {
        if (shouldLog == null)
        {
            shouldLog = false;
        }

        exports.sendJsonResult(res, result, shouldLog);
    }
};

/**
 * send404Error
 * @param res
 * @param {String} errorMessage
 */
exports.send404Error = function(res, errorMessage)
{
    console.log("404 error");

    if (errorMessage != null)
    {
        console.log(errorMessage);
    }

    // Send 404
    res.status(404);
};
