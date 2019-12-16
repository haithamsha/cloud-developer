export const config = {
  "dev": {
    "username": "postgres",
    "password": "asd123",
    "database": "carsdb",
    "host": "localhost",
    "dialect": "postgres"
  },
  "prod": {
    "username": "devdbuser",
    "password": "devdbpass",
    "database": "devdb",
    "host": "devdb.cywj6c7gn6vx.us-east-2.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-east-2",
    "aws_profile": "default",
    "aws_media_bucket": "devbucketdev"
  }
}
