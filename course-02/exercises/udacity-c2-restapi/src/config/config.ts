export const config = {
  "dev": {
    "username": process.env.POSTGRESS_USERNAME_DEV,
    "password": process.env.POSTGRESS_PASSWORD_DEV,
    "database": process.env.POSTGRESS_DATABASE_DEV,
    "host": process.env.POSTGRESS_DEVHOST_DEV,
    "dialect": "postgres"
  },
  "prod": {
    "username": process.env.POSTGRESS_USERNAME_PROD,
    "password": process.env.POSTGRESS_PASSWORD_PROD,
    "database": process.env.POSTGRESS_DATABASE_PROD,
    "host": process.env.POSTGRESS_HOST_PROD,
    "dialect": "postgres",
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET
  },
  "jwt": {
    "secret": "hl"
  }
}
