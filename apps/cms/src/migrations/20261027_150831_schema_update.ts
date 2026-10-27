import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "posts_extras_quick_read_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "posts_extras_key_figures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "posts_extras_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"before" varchar
  );
  
  CREATE TABLE "posts_extras_toc_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "_posts_v_version_extras_quick_read_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_extras_key_figures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_extras_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"before" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_extras_toc_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "posts" ADD COLUMN "extras_quick_read_reviewed" boolean DEFAULT false;
  ALTER TABLE "posts" ADD COLUMN "extras_quick_read_generated_at" timestamp(3) with time zone;
  ALTER TABLE "posts" ADD COLUMN "extras_pull_quote" varchar;
  ALTER TABLE "posts" ADD COLUMN "audio_id" integer;
  ALTER TABLE "posts" ADD COLUMN "hide_listen" boolean DEFAULT false;
  ALTER TABLE "_posts_v" ADD COLUMN "version_extras_quick_read_reviewed" boolean DEFAULT false;
  ALTER TABLE "_posts_v" ADD COLUMN "version_extras_quick_read_generated_at" timestamp(3) with time zone;
  ALTER TABLE "_posts_v" ADD COLUMN "version_extras_pull_quote" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_audio_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_hide_listen" boolean DEFAULT false;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_filename" varchar;
  ALTER TABLE "posts_extras_quick_read_points" ADD CONSTRAINT "posts_extras_quick_read_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_extras_key_figures" ADD CONSTRAINT "posts_extras_key_figures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_extras_sections" ADD CONSTRAINT "posts_extras_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_extras_toc_labels" ADD CONSTRAINT "posts_extras_toc_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_extras_quick_read_points" ADD CONSTRAINT "_posts_v_version_extras_quick_read_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_extras_key_figures" ADD CONSTRAINT "_posts_v_version_extras_key_figures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_extras_sections" ADD CONSTRAINT "_posts_v_version_extras_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_extras_toc_labels" ADD CONSTRAINT "_posts_v_version_extras_toc_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_extras_quick_read_points_order_idx" ON "posts_extras_quick_read_points" USING btree ("_order");
  CREATE INDEX "posts_extras_quick_read_points_parent_id_idx" ON "posts_extras_quick_read_points" USING btree ("_parent_id");
  CREATE INDEX "posts_extras_key_figures_order_idx" ON "posts_extras_key_figures" USING btree ("_order");
  CREATE INDEX "posts_extras_key_figures_parent_id_idx" ON "posts_extras_key_figures" USING btree ("_parent_id");
  CREATE INDEX "posts_extras_sections_order_idx" ON "posts_extras_sections" USING btree ("_order");
  CREATE INDEX "posts_extras_sections_parent_id_idx" ON "posts_extras_sections" USING btree ("_parent_id");
  CREATE INDEX "posts_extras_toc_labels_order_idx" ON "posts_extras_toc_labels" USING btree ("_order");
  CREATE INDEX "posts_extras_toc_labels_parent_id_idx" ON "posts_extras_toc_labels" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_extras_quick_read_points_order_idx" ON "_posts_v_version_extras_quick_read_points" USING btree ("_order");
  CREATE INDEX "_posts_v_version_extras_quick_read_points_parent_id_idx" ON "_posts_v_version_extras_quick_read_points" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_extras_key_figures_order_idx" ON "_posts_v_version_extras_key_figures" USING btree ("_order");
  CREATE INDEX "_posts_v_version_extras_key_figures_parent_id_idx" ON "_posts_v_version_extras_key_figures" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_extras_sections_order_idx" ON "_posts_v_version_extras_sections" USING btree ("_order");
  CREATE INDEX "_posts_v_version_extras_sections_parent_id_idx" ON "_posts_v_version_extras_sections" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_extras_toc_labels_order_idx" ON "_posts_v_version_extras_toc_labels" USING btree ("_order");
  CREATE INDEX "_posts_v_version_extras_toc_labels_parent_id_idx" ON "_posts_v_version_extras_toc_labels" USING btree ("_parent_id");
  ALTER TABLE "posts" ADD CONSTRAINT "posts_audio_id_media_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_audio_id_media_id_fk" FOREIGN KEY ("version_audio_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "posts_audio_idx" ON "posts" USING btree ("audio_id");
  CREATE INDEX "_posts_v_version_version_audio_idx" ON "_posts_v" USING btree ("version_audio_id");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_extras_quick_read_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_extras_key_figures" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_extras_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_extras_toc_labels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_extras_quick_read_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_extras_key_figures" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_extras_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_extras_toc_labels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_extras_quick_read_points" CASCADE;
  DROP TABLE "posts_extras_key_figures" CASCADE;
  DROP TABLE "posts_extras_sections" CASCADE;
  DROP TABLE "posts_extras_toc_labels" CASCADE;
  DROP TABLE "_posts_v_version_extras_quick_read_points" CASCADE;
  DROP TABLE "_posts_v_version_extras_key_figures" CASCADE;
  DROP TABLE "_posts_v_version_extras_sections" CASCADE;
  DROP TABLE "_posts_v_version_extras_toc_labels" CASCADE;
  ALTER TABLE "posts" DROP CONSTRAINT "posts_audio_id_media_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_audio_id_media_id_fk";
  
  DROP INDEX "posts_audio_idx";
  DROP INDEX "_posts_v_version_version_audio_idx";
  DROP INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx";
  ALTER TABLE "posts" DROP COLUMN "extras_quick_read_reviewed";
  ALTER TABLE "posts" DROP COLUMN "extras_quick_read_generated_at";
  ALTER TABLE "posts" DROP COLUMN "extras_pull_quote";
  ALTER TABLE "posts" DROP COLUMN "audio_id";
  ALTER TABLE "posts" DROP COLUMN "hide_listen";
  ALTER TABLE "_posts_v" DROP COLUMN "version_extras_quick_read_reviewed";
  ALTER TABLE "_posts_v" DROP COLUMN "version_extras_quick_read_generated_at";
  ALTER TABLE "_posts_v" DROP COLUMN "version_extras_pull_quote";
  ALTER TABLE "_posts_v" DROP COLUMN "version_audio_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_hide_listen";
  ALTER TABLE "media" DROP COLUMN "sizes_xlarge_url";
  ALTER TABLE "media" DROP COLUMN "sizes_xlarge_width";
  ALTER TABLE "media" DROP COLUMN "sizes_xlarge_height";
  ALTER TABLE "media" DROP COLUMN "sizes_xlarge_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_xlarge_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_xlarge_filename";`)
}
