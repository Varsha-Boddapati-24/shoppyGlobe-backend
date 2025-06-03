
function validateFields(allowedFields = []) {
    return (req, res, next) => {
        const keys = Object.keys(req.body);// Extract keys from request body
  // ---------- POST Request: Check for all required fields ----------
        if (req.method === "POST") {
            const hasAllRequired = allowedFields.every(field => keys.includes(field));
            if (!hasAllRequired) {
                return res.status(400).json({
                    error: `Missing required fields: ${allowedFields.join(", ")}`
                });
            }
        }

        // ---------- PUT Request: Require at least one field ----------
        if (req.method === "PUT" && keys.length === 0) {
            return res.status(400).json({
                error: "At least one field must be provided to update"
            });
        }
  // ---------- Check for unexpected fields ----------
        const hasInvalidFields = keys.some(key => !allowedFields.includes(key));
        if (hasInvalidFields) {
            return res.status(400).json({
                error: `Invalid fields in request body. Allowed fields: ${allowedFields.join(", ")}`
            });
        }
 // ---------- Check for empty or invalid values ---------
    
      const hasEmptyValues = keys.some(key => {
            const val = req.body[key];
            return val === null || val === undefined || (typeof val === 'string' && val.trim() === "");
        });

        if (hasEmptyValues) {
            return res.status(400).json({
                error: "Fields must not be empty"
            });
        }
  // ---------- If all checks pass, move to next middleware/controller ----------
        next();
    };
}

export default validateFields;
