import * as aws from "@pulumi/aws";

const bucket = new aws.s3.Bucket("my-bucket", {
    // The name of the bucket. This name is globally unique, and the namespace is shared by all AWS accounts.
    bucket: "my-unique-bucket-name", 
    // By default, all S3 buckets are private. Set the ACL to 'public-read' if you want the bucket to be publicly readable.
    acl: "private", 
});

aws.getCallerIdentityOutput().apply(x => {
  console.log(`hello ${x.accountId}`);
});

// Export the name of the bucket
export const bucketName = bucket.id;

// Additional: Export the bucket endpoint, if you intend to use it in some application or for reference.
export const bucketEndpoint = pulumi.interpolate`http://${bucket.bucketRegionalDomainName}`;
