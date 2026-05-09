import jwt from "jsonwebtoken";

// ================= VERIFY TOKEN =================
export const verifyToken = (
  req,
  res,
  next
) => {

  try {

    // ================= GET HEADER =================
    const authHeader =
      req.headers.token;

    // ================= CHECK TOKEN =================
    if (!authHeader) {

      return res.status(401).json({

        success: false,

        message:
          "Access denied. No token provided.",

      });

    }

    // ================= FORMAT CHECK =================
    if (
      !authHeader.startsWith(
        "Bearer "
      )
    ) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid token format.",

      });

    }

    // ================= EXTRACT TOKEN =================
    const token =
      authHeader.split(" ")[1];

    // ================= VERIFY JWT =================
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {

        if (err) {

          // TOKEN EXPIRED
          if (
            err.name ===
            "TokenExpiredError"
          ) {

            return res.status(401).json({

              success: false,

              message:
                "Session expired. Please login again.",

            });

          }

          // INVALID TOKEN
          return res.status(403).json({

            success: false,

            message:
              "Invalid token.",

          });

        }

        // SAVE USER DATA
        req.user = decoded;

        next();

      }
    );

  } catch (err) {

    console.log(err);

    return res.status(500).json({

      success: false,

      message:
        "Authentication failed.",

    });

  }

};

// ================= VERIFY ADMIN =================
export const verifyAdmin = (
  req,
  res,
  next
) => {

  verifyToken(
    req,
    res,
    () => {

      // CHECK ROLE
      if (
        req.user &&
        req.user.role ===
          "Admin"
      ) {

        next();

      } else {

        return res.status(403).json({

          success: false,

          message:
            "Access denied. Admins only.",

        });

      }

    }
  );

};

// ================= VERIFY MEMBER =================
export const verifyMember = (
  req,
  res,
  next
) => {

  verifyToken(
    req,
    res,
    () => {

      if (
        req.user &&
        req.user.role ===
          "Member"
      ) {

        next();

      } else {

        return res.status(403).json({

          success: false,

          message:
            "Access denied. Members only.",

        });

      }

    }
  );

};