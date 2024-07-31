<!-- npm is for installing and managing dependencies, while npx is for executing packages
npx allows running a package's command-line interface (CLI) tool without installing it globally or locally
npx will automatically install the package if it hasn't been installed already
npm is used for managing dependencies in a project, while npx is used for executing command-line tools that are part of a package -->


install this package:
npm install express @supabase/supabase-js bcryptjs jsonwebtoken express-validator

npm run dev -> command for localhost



Problems occurred while building this app:
1. Error: [supabase/migrations/meta/0017_snapshot.json, supabase/migrations/meta/0018_snapshot.json] are pointing to a parent snapshot: supabase/migrations/meta/0017_snapshot.json/snapshot.json which is a collision.

2. applying migrations...PostgresError: column "member_name" of relation "group_member_table" already exists  (This type of problem has really made me feel frustrated) 
   solved: by deleting the last updated snapshot.json file and sql file and edited _journal.json file.