# fortune-lambda: Linux fortune for AWS Lambda

## How to build, deploy and execute

1. Modify the files in `datfile` if needed. All the epigrams are defined in those files.
2. `npm run build` to make message files.
3. `aws configure` to set the access key to use Serverless Framework.
4. `sls deploy` to deploy the application to your AWS account.
5. To execute, just send GET request to the endpoint. You can specify the options by path parameter as `http://endpoint/{options}` .

## License

All the files in the datfiles directory were copied from the source code of fortune-mod 9708, which I find out in ibiblio.org.
https://www.ibiblio.org/pub/linux/games/amusements/fortune/fortune-mod-9708.tar.gz

According to the LSM file, The authors of fortune-mod 9708 are NetBSD, florian@jurix.jura.uni-sb.de (Florian La Roche) and alewis@email.unc.edu(Amy A. Lewis), and fortune-mod 9708 is licensed under the BSD license. See the LSM file for the details:
https://www.ibiblio.org/pub/linux/games/amusements/fortune/fortune-mod.lsm

All the other files in this repository are authored by myself and licensed under the MIT license. See LICENSE for the details.
