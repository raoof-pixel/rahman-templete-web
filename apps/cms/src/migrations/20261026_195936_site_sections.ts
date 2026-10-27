import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_magazine_issues_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__magazine_issues_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_podcast_episodes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__podcast_episodes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_event_status" AS ENUM('scheduled', 'cancelled', 'postponed', 'past');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_provinces_code" AS ENUM('AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT');
  CREATE TYPE "public"."enum_resources_group" AS ENUM('start', 'money', 'growth', 'operations');
  CREATE TYPE "public"."enum_funding_programs_need" AS ENUM('loans', 'export', 'tech', 'hire');
  CREATE TYPE "public"."enum_legal_pages_slug" AS ENUM('privacy', 'terms', 'terms-of-use', 'accessibility');
  CREATE TYPE "public"."enum_submissions_type" AS ENUM('newsletter', 'popup', 'contact', 'advertise', 'gate', 'offer');
  CREATE TYPE "public"."enum_submissions_status" AS ENUM('new', 'handled', 'spam');
  CREATE TYPE "public"."enum_ads_slots_slot" AS ENUM('home-sidebar-1', 'home-sidebar-2', 'home-sidebar-3', 'home-banner-1', 'home-banner-2', 'home-subscribe-banner', 'home-advertise-banner', 'post-sidebar-1', 'post-sidebar-2', 'post-sidebar-3');
  CREATE TYPE "public"."enum_navigation_mega_menus_key" AS ENUM('business', 'technology', 'about', 'leadership', 'finance');
  CREATE TABLE "deadlines" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"title" varchar NOT NULL,
  	"who" varchar,
  	"source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "magazine_issues_inside" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "magazine_issues" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"number" numeric,
  	"month" varchar,
  	"issue_date" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"desc" varchar,
  	"cover_id" integer,
  	"cover_alt" varchar,
  	"read_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_magazine_issues_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_magazine_issues_v_version_inside" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_magazine_issues_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_number" numeric,
  	"version_month" varchar,
  	"version_issue_date" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_desc" varchar,
  	"version_cover_id" integer,
  	"version_cover_alt" varchar,
  	"version_read_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__magazine_issues_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "podcast_episodes_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"t" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "podcast_episodes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"number" numeric,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"date" timestamp(3) with time zone,
  	"duration" varchar,
  	"length" varchar,
  	"desc" varchar,
  	"art_id" integer,
  	"audio_id" integer,
  	"audio_url" varchar,
  	"notes_intro" varchar,
  	"spotify" varchar,
  	"apple" varchar,
  	"youtube" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_podcast_episodes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_podcast_episodes_v_version_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"t" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_podcast_episodes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_number" numeric,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_date" timestamp(3) with time zone,
  	"version_duration" varchar,
  	"version_length" varchar,
  	"version_desc" varchar,
  	"version_art_id" integer,
  	"version_audio_id" integer,
  	"version_audio_url" varchar,
  	"version_notes_intro" varchar,
  	"version_spotify" varchar,
  	"version_apple" varchar,
  	"version_youtube" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__podcast_episodes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "events_expect" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"kicker" varchar,
  	"desc" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"image_alt" varchar,
  	"date_text" varchar,
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone,
  	"venue" varchar,
  	"address" varchar,
  	"admission" varchar,
  	"register_url" varchar,
  	"partner_url" varchar,
  	"status" "enum_events_event_status" DEFAULT 'scheduled',
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_events_v_version_expect" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_kicker" varchar,
  	"version_desc" varchar,
  	"version_intro" varchar,
  	"version_image_id" integer,
  	"version_image_alt" varchar,
  	"version_date_text" varchar,
  	"version_start" timestamp(3) with time zone,
  	"version_end" timestamp(3) with time zone,
  	"version_venue" varchar,
  	"version_address" varchar,
  	"version_admission" varchar,
  	"version_register_url" varchar,
  	"version_partner_url" varchar,
  	"version_status" "enum_events_event_status" DEFAULT 'scheduled',
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "provinces_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"note" varchar
  );
  
  CREATE TABLE "provinces_watch" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "provinces_comply" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"desc" varchar,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "provinces_fund" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"desc" varchar,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "provinces_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"note" varchar
  );
  
  CREATE TABLE "provinces_start" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"h" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"link_label" varchar,
  	"link_href" varchar
  );
  
  CREATE TABLE "provinces_article_sections_ps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "provinces_article_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"h" varchar
  );
  
  CREATE TABLE "provinces" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"code" "enum_provinces_code" NOT NULL,
  	"order" numeric DEFAULT 0,
  	"intro" varchar NOT NULL,
  	"hub_summary" varchar,
  	"agency_name" varchar,
  	"agency_url" varchar,
  	"about_cap" varchar,
  	"about_city" varchar,
  	"about_ind" varchar,
  	"about_chamber_name" varchar,
  	"about_chamber_url" varchar,
  	"premier" varchar,
  	"premier_photo_id" integer,
  	"cabinet" varchar,
  	"sb_min_name" varchar,
  	"sb_min_role" varchar,
  	"minister_photo_id" integer,
  	"article_title" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"key" varchar NOT NULL,
  	"slot" varchar,
  	"group" "enum_resources_group" NOT NULL,
  	"kind" varchar,
  	"desc" varchar,
  	"cover_id" integer,
  	"image_label" varchar,
  	"file_id" integer,
  	"external_url" varchar,
  	"gated" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "funding_programs_need" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_funding_programs_need",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "funding_programs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"tag" varchar,
  	"desc" varchar,
  	"href" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "offers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"partner" varchar NOT NULL,
  	"cat" varchar NOT NULL,
  	"value" varchar,
  	"desc" varchar,
  	"code" varchar,
  	"href" varchar,
  	"logo_id" integer,
  	"expires_at" timestamp(3) with time zone,
  	"expires_label" varchar,
  	"active" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"terms" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "legal_pages_sections_ps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "legal_pages_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "legal_pages_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"h" varchar NOT NULL
  );
  
  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" "enum_legal_pages_slug" NOT NULL,
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"intro" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_submissions_type" NOT NULL,
  	"email" varchar,
  	"name" varchar,
  	"data" jsonb,
  	"consent_given" boolean,
  	"consent_text" varchar,
  	"consent_at" timestamp(3) with time zone,
  	"source" varchar,
  	"ip_hash" varchar,
  	"user_agent" varchar,
  	"mailchimp" varchar,
  	"status" "enum_submissions_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"logo_alt" varchar,
  	"lines" varchar NOT NULL,
  	"cta" varchar DEFAULT 'Read Now',
  	"href" varchar NOT NULL,
  	"bg" varchar,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "homepage_secondary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sponsor" varchar NOT NULL,
  	"post_id" integer,
  	"cat" varchar,
  	"title" varchar,
  	"excerpt" varchar,
  	"date" varchar,
  	"read" varchar,
  	"image_id" integer,
  	"alt" varchar,
  	"href" varchar,
  	"placeholder" varchar
  );
  
  CREATE TABLE "homepage_ai_topic_more" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_id" integer,
  	"title" varchar,
  	"excerpt" varchar,
  	"date" varchar,
  	"read" varchar,
  	"image_id" integer,
  	"alt" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "homepage_most_read" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_id" integer,
  	"title" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "homepage_topic_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"desc" varchar,
  	"href" varchar NOT NULL,
  	"ink" varchar,
  	"tint" varchar,
  	"line" varchar
  );
  
  CREATE TABLE "homepage_communities_more" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_id" integer,
  	"title" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "homepage_communities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"slot" varchar,
  	"category_id" integer,
  	"href" varchar,
  	"lead_post_id" integer,
  	"lead_title" varchar,
  	"lead_excerpt" varchar,
  	"lead_image_id" integer,
  	"lead_alt" varchar,
  	"lead_href" varchar
  );
  
  CREATE TABLE "homepage_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mark" varchar,
  	"title" varchar NOT NULL,
  	"desc" varchar,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_finder_needs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_programs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slot" varchar,
  	"title" varchar NOT NULL,
  	"desc" varchar,
  	"image" varchar,
  	"photo_id" integer,
  	"href" varchar NOT NULL,
  	"cta" varchar DEFAULT 'Learn more →'
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_post_id" integer,
  	"hero_cat" varchar,
  	"hero_title" varchar,
  	"hero_excerpt" varchar,
  	"hero_date" varchar,
  	"hero_read" varchar,
  	"hero_image_id" integer,
  	"hero_alt" varchar,
  	"hero_href" varchar,
  	"ai_topic_lead_post_id" integer,
  	"ai_topic_lead_title" varchar,
  	"ai_topic_lead_excerpt" varchar,
  	"ai_topic_lead_date" varchar,
  	"ai_topic_lead_read" varchar,
  	"ai_topic_lead_image_id" integer,
  	"ai_topic_lead_alt" varchar,
  	"ai_topic_lead_href" varchar,
  	"spotlight_post_id" integer,
  	"spotlight_title" varchar,
  	"spotlight_excerpt" varchar,
  	"spotlight_image_id" integer,
  	"spotlight_alt" varchar,
  	"spotlight_href" varchar,
  	"wotm_month" varchar NOT NULL,
  	"wotm_name" varchar NOT NULL,
  	"wotm_role" varchar,
  	"wotm_kicker" varchar,
  	"wotm_post_id" integer,
  	"wotm_title" varchar,
  	"wotm_excerpt" varchar,
  	"wotm_image_id" integer,
  	"wotm_alt" varchar,
  	"wotm_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "ads_slots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slot" "enum_ads_slots_slot" NOT NULL,
  	"show" boolean DEFAULT true,
  	"image_id" integer,
  	"alt" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "ads_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "ads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sidebar_sponsored_title" varchar,
  	"sidebar_sponsored_desc" varchar,
  	"sidebar_sponsored_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "advertise_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"v" varchar NOT NULL,
  	"l" varchar NOT NULL,
  	"source" varchar
  );
  
  CREATE TABLE "advertise_audience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL
  );
  
  CREATE TABLE "advertise_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL
  );
  
  CREATE TABLE "advertise_goals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "advertise_why" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL
  );
  
  CREATE TABLE "advertise_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL
  );
  
  CREATE TABLE "advertise_interests" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "advertise_budgets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "advertise_timing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "advertise" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_kit_id" integer,
  	"media_kit_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_sister_titles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_sitemap_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_sitemap_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"provinces" boolean
  );
  
  CREATE TABLE "navigation_mega_menus_cols_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_mega_menus_cols" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_mega_menus" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_navigation_mega_menus_key" NOT NULL,
  	"badge" varchar,
  	"featured" varchar,
  	"featured_href" varchar
  );
  
  ALTER TABLE "navigation_header_children" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_footer_children" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_footer" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "navigation_header_children" CASCADE;
  DROP TABLE "navigation_header" CASCADE;
  DROP TABLE "navigation_footer_children" CASCADE;
  DROP TABLE "navigation_footer" CASCADE;
  ALTER TABLE "site_settings" ALTER COLUMN "subscribe_url" SET DEFAULT '/newsletter/';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "deadlines_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "magazine_issues_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "podcast_episodes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "provinces_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "resources_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "funding_programs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "offers_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "legal_pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "submissions_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "social_spotify" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "social_apple" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "social_podcast_youtube" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "editor_author_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "latest_issue_href" varchar;
  ALTER TABLE "magazine_issues_inside" ADD CONSTRAINT "magazine_issues_inside_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."magazine_issues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "magazine_issues" ADD CONSTRAINT "magazine_issues_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_magazine_issues_v_version_inside" ADD CONSTRAINT "_magazine_issues_v_version_inside_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_magazine_issues_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_magazine_issues_v" ADD CONSTRAINT "_magazine_issues_v_parent_id_magazine_issues_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."magazine_issues"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_magazine_issues_v" ADD CONSTRAINT "_magazine_issues_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "podcast_episodes_notes" ADD CONSTRAINT "podcast_episodes_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."podcast_episodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "podcast_episodes" ADD CONSTRAINT "podcast_episodes_art_id_media_id_fk" FOREIGN KEY ("art_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "podcast_episodes" ADD CONSTRAINT "podcast_episodes_audio_id_media_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_podcast_episodes_v_version_notes" ADD CONSTRAINT "_podcast_episodes_v_version_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_podcast_episodes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_podcast_episodes_v" ADD CONSTRAINT "_podcast_episodes_v_parent_id_podcast_episodes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."podcast_episodes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_podcast_episodes_v" ADD CONSTRAINT "_podcast_episodes_v_version_art_id_media_id_fk" FOREIGN KEY ("version_art_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_podcast_episodes_v" ADD CONSTRAINT "_podcast_episodes_v_version_audio_id_media_id_fk" FOREIGN KEY ("version_audio_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_expect" ADD CONSTRAINT "events_expect_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_version_expect" ADD CONSTRAINT "_events_v_version_expect_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "provinces_facts" ADD CONSTRAINT "provinces_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."provinces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "provinces_watch" ADD CONSTRAINT "provinces_watch_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."provinces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "provinces_comply" ADD CONSTRAINT "provinces_comply_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."provinces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "provinces_fund" ADD CONSTRAINT "provinces_fund_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."provinces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "provinces_about_stats" ADD CONSTRAINT "provinces_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."provinces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "provinces_start" ADD CONSTRAINT "provinces_start_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."provinces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "provinces_article_sections_ps" ADD CONSTRAINT "provinces_article_sections_ps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."provinces_article_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "provinces_article_sections" ADD CONSTRAINT "provinces_article_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."provinces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "provinces" ADD CONSTRAINT "provinces_premier_photo_id_media_id_fk" FOREIGN KEY ("premier_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "provinces" ADD CONSTRAINT "provinces_minister_photo_id_media_id_fk" FOREIGN KEY ("minister_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "funding_programs_need" ADD CONSTRAINT "funding_programs_need_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."funding_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal_pages_sections_ps" ADD CONSTRAINT "legal_pages_sections_ps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages_sections_items" ADD CONSTRAINT "legal_pages_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages_sections" ADD CONSTRAINT "legal_pages_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_slides" ADD CONSTRAINT "homepage_slides_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_slides" ADD CONSTRAINT "homepage_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_slides" ADD CONSTRAINT "homepage_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_secondary" ADD CONSTRAINT "homepage_secondary_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_secondary" ADD CONSTRAINT "homepage_secondary_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_secondary" ADD CONSTRAINT "homepage_secondary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_ai_topic_more" ADD CONSTRAINT "homepage_ai_topic_more_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_ai_topic_more" ADD CONSTRAINT "homepage_ai_topic_more_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_ai_topic_more" ADD CONSTRAINT "homepage_ai_topic_more_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_most_read" ADD CONSTRAINT "homepage_most_read_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_most_read" ADD CONSTRAINT "homepage_most_read_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_topic_cards" ADD CONSTRAINT "homepage_topic_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_communities_more" ADD CONSTRAINT "homepage_communities_more_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_communities_more" ADD CONSTRAINT "homepage_communities_more_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_communities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_communities" ADD CONSTRAINT "homepage_communities_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_communities" ADD CONSTRAINT "homepage_communities_lead_post_id_posts_id_fk" FOREIGN KEY ("lead_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_communities" ADD CONSTRAINT "homepage_communities_lead_image_id_media_id_fk" FOREIGN KEY ("lead_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_communities" ADD CONSTRAINT "homepage_communities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_tools" ADD CONSTRAINT "homepage_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_finder_needs" ADD CONSTRAINT "homepage_finder_needs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_programs" ADD CONSTRAINT "homepage_programs_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_programs" ADD CONSTRAINT "homepage_programs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_post_id_posts_id_fk" FOREIGN KEY ("hero_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_ai_topic_lead_post_id_posts_id_fk" FOREIGN KEY ("ai_topic_lead_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_ai_topic_lead_image_id_media_id_fk" FOREIGN KEY ("ai_topic_lead_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_spotlight_post_id_posts_id_fk" FOREIGN KEY ("spotlight_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_spotlight_image_id_media_id_fk" FOREIGN KEY ("spotlight_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_wotm_post_id_posts_id_fk" FOREIGN KEY ("wotm_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_wotm_image_id_media_id_fk" FOREIGN KEY ("wotm_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ads_slots" ADD CONSTRAINT "ads_slots_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ads_slots" ADD CONSTRAINT "ads_slots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ads_partners" ADD CONSTRAINT "ads_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ads_partners" ADD CONSTRAINT "ads_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "advertise_metrics" ADD CONSTRAINT "advertise_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."advertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "advertise_audience" ADD CONSTRAINT "advertise_audience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."advertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "advertise_options" ADD CONSTRAINT "advertise_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."advertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "advertise_goals" ADD CONSTRAINT "advertise_goals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."advertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "advertise_why" ADD CONSTRAINT "advertise_why_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."advertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "advertise_faq" ADD CONSTRAINT "advertise_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."advertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "advertise_interests" ADD CONSTRAINT "advertise_interests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."advertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "advertise_budgets" ADD CONSTRAINT "advertise_budgets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."advertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "advertise_timing" ADD CONSTRAINT "advertise_timing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."advertise"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "advertise" ADD CONSTRAINT "advertise_media_kit_id_media_id_fk" FOREIGN KEY ("media_kit_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_sister_titles" ADD CONSTRAINT "site_settings_sister_titles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_sitemap_groups_links" ADD CONSTRAINT "site_settings_sitemap_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_sitemap_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_sitemap_groups" ADD CONSTRAINT "site_settings_sitemap_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_mega_menus_cols_links" ADD CONSTRAINT "navigation_mega_menus_cols_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_mega_menus_cols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_mega_menus_cols" ADD CONSTRAINT "navigation_mega_menus_cols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_mega_menus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_mega_menus" ADD CONSTRAINT "navigation_mega_menus_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "deadlines_date_idx" ON "deadlines" USING btree ("date");
  CREATE INDEX "deadlines_updated_at_idx" ON "deadlines" USING btree ("updated_at");
  CREATE INDEX "deadlines_created_at_idx" ON "deadlines" USING btree ("created_at");
  CREATE INDEX "magazine_issues_inside_order_idx" ON "magazine_issues_inside" USING btree ("_order");
  CREATE INDEX "magazine_issues_inside_parent_id_idx" ON "magazine_issues_inside" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "magazine_issues_number_idx" ON "magazine_issues" USING btree ("number");
  CREATE UNIQUE INDEX "magazine_issues_slug_idx" ON "magazine_issues" USING btree ("slug");
  CREATE INDEX "magazine_issues_cover_idx" ON "magazine_issues" USING btree ("cover_id");
  CREATE INDEX "magazine_issues_updated_at_idx" ON "magazine_issues" USING btree ("updated_at");
  CREATE INDEX "magazine_issues_created_at_idx" ON "magazine_issues" USING btree ("created_at");
  CREATE INDEX "magazine_issues__status_idx" ON "magazine_issues" USING btree ("_status");
  CREATE INDEX "_magazine_issues_v_version_inside_order_idx" ON "_magazine_issues_v_version_inside" USING btree ("_order");
  CREATE INDEX "_magazine_issues_v_version_inside_parent_id_idx" ON "_magazine_issues_v_version_inside" USING btree ("_parent_id");
  CREATE INDEX "_magazine_issues_v_parent_idx" ON "_magazine_issues_v" USING btree ("parent_id");
  CREATE INDEX "_magazine_issues_v_version_version_number_idx" ON "_magazine_issues_v" USING btree ("version_number");
  CREATE INDEX "_magazine_issues_v_version_version_slug_idx" ON "_magazine_issues_v" USING btree ("version_slug");
  CREATE INDEX "_magazine_issues_v_version_version_cover_idx" ON "_magazine_issues_v" USING btree ("version_cover_id");
  CREATE INDEX "_magazine_issues_v_version_version_updated_at_idx" ON "_magazine_issues_v" USING btree ("version_updated_at");
  CREATE INDEX "_magazine_issues_v_version_version_created_at_idx" ON "_magazine_issues_v" USING btree ("version_created_at");
  CREATE INDEX "_magazine_issues_v_version_version__status_idx" ON "_magazine_issues_v" USING btree ("version__status");
  CREATE INDEX "_magazine_issues_v_created_at_idx" ON "_magazine_issues_v" USING btree ("created_at");
  CREATE INDEX "_magazine_issues_v_updated_at_idx" ON "_magazine_issues_v" USING btree ("updated_at");
  CREATE INDEX "_magazine_issues_v_latest_idx" ON "_magazine_issues_v" USING btree ("latest");
  CREATE INDEX "podcast_episodes_notes_order_idx" ON "podcast_episodes_notes" USING btree ("_order");
  CREATE INDEX "podcast_episodes_notes_parent_id_idx" ON "podcast_episodes_notes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "podcast_episodes_number_idx" ON "podcast_episodes" USING btree ("number");
  CREATE UNIQUE INDEX "podcast_episodes_slug_idx" ON "podcast_episodes" USING btree ("slug");
  CREATE INDEX "podcast_episodes_date_idx" ON "podcast_episodes" USING btree ("date");
  CREATE INDEX "podcast_episodes_art_idx" ON "podcast_episodes" USING btree ("art_id");
  CREATE INDEX "podcast_episodes_audio_idx" ON "podcast_episodes" USING btree ("audio_id");
  CREATE INDEX "podcast_episodes_updated_at_idx" ON "podcast_episodes" USING btree ("updated_at");
  CREATE INDEX "podcast_episodes_created_at_idx" ON "podcast_episodes" USING btree ("created_at");
  CREATE INDEX "podcast_episodes__status_idx" ON "podcast_episodes" USING btree ("_status");
  CREATE INDEX "_podcast_episodes_v_version_notes_order_idx" ON "_podcast_episodes_v_version_notes" USING btree ("_order");
  CREATE INDEX "_podcast_episodes_v_version_notes_parent_id_idx" ON "_podcast_episodes_v_version_notes" USING btree ("_parent_id");
  CREATE INDEX "_podcast_episodes_v_parent_idx" ON "_podcast_episodes_v" USING btree ("parent_id");
  CREATE INDEX "_podcast_episodes_v_version_version_number_idx" ON "_podcast_episodes_v" USING btree ("version_number");
  CREATE INDEX "_podcast_episodes_v_version_version_slug_idx" ON "_podcast_episodes_v" USING btree ("version_slug");
  CREATE INDEX "_podcast_episodes_v_version_version_date_idx" ON "_podcast_episodes_v" USING btree ("version_date");
  CREATE INDEX "_podcast_episodes_v_version_version_art_idx" ON "_podcast_episodes_v" USING btree ("version_art_id");
  CREATE INDEX "_podcast_episodes_v_version_version_audio_idx" ON "_podcast_episodes_v" USING btree ("version_audio_id");
  CREATE INDEX "_podcast_episodes_v_version_version_updated_at_idx" ON "_podcast_episodes_v" USING btree ("version_updated_at");
  CREATE INDEX "_podcast_episodes_v_version_version_created_at_idx" ON "_podcast_episodes_v" USING btree ("version_created_at");
  CREATE INDEX "_podcast_episodes_v_version_version__status_idx" ON "_podcast_episodes_v" USING btree ("version__status");
  CREATE INDEX "_podcast_episodes_v_created_at_idx" ON "_podcast_episodes_v" USING btree ("created_at");
  CREATE INDEX "_podcast_episodes_v_updated_at_idx" ON "_podcast_episodes_v" USING btree ("updated_at");
  CREATE INDEX "_podcast_episodes_v_latest_idx" ON "_podcast_episodes_v" USING btree ("latest");
  CREATE INDEX "events_expect_order_idx" ON "events_expect" USING btree ("_order");
  CREATE INDEX "events_expect_parent_id_idx" ON "events_expect" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_image_idx" ON "events" USING btree ("image_id");
  CREATE INDEX "events_order_idx" ON "events" USING btree ("order");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "_events_v_version_expect_order_idx" ON "_events_v_version_expect" USING btree ("_order");
  CREATE INDEX "_events_v_version_expect_parent_id_idx" ON "_events_v_version_expect" USING btree ("_parent_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_image_idx" ON "_events_v" USING btree ("version_image_id");
  CREATE INDEX "_events_v_version_version_order_idx" ON "_events_v" USING btree ("version_order");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX "provinces_facts_order_idx" ON "provinces_facts" USING btree ("_order");
  CREATE INDEX "provinces_facts_parent_id_idx" ON "provinces_facts" USING btree ("_parent_id");
  CREATE INDEX "provinces_watch_order_idx" ON "provinces_watch" USING btree ("_order");
  CREATE INDEX "provinces_watch_parent_id_idx" ON "provinces_watch" USING btree ("_parent_id");
  CREATE INDEX "provinces_comply_order_idx" ON "provinces_comply" USING btree ("_order");
  CREATE INDEX "provinces_comply_parent_id_idx" ON "provinces_comply" USING btree ("_parent_id");
  CREATE INDEX "provinces_fund_order_idx" ON "provinces_fund" USING btree ("_order");
  CREATE INDEX "provinces_fund_parent_id_idx" ON "provinces_fund" USING btree ("_parent_id");
  CREATE INDEX "provinces_about_stats_order_idx" ON "provinces_about_stats" USING btree ("_order");
  CREATE INDEX "provinces_about_stats_parent_id_idx" ON "provinces_about_stats" USING btree ("_parent_id");
  CREATE INDEX "provinces_start_order_idx" ON "provinces_start" USING btree ("_order");
  CREATE INDEX "provinces_start_parent_id_idx" ON "provinces_start" USING btree ("_parent_id");
  CREATE INDEX "provinces_article_sections_ps_order_idx" ON "provinces_article_sections_ps" USING btree ("_order");
  CREATE INDEX "provinces_article_sections_ps_parent_id_idx" ON "provinces_article_sections_ps" USING btree ("_parent_id");
  CREATE INDEX "provinces_article_sections_order_idx" ON "provinces_article_sections" USING btree ("_order");
  CREATE INDEX "provinces_article_sections_parent_id_idx" ON "provinces_article_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "provinces_slug_idx" ON "provinces" USING btree ("slug");
  CREATE UNIQUE INDEX "provinces_code_idx" ON "provinces" USING btree ("code");
  CREATE INDEX "provinces_order_idx" ON "provinces" USING btree ("order");
  CREATE INDEX "provinces_premier_photo_idx" ON "provinces" USING btree ("premier_photo_id");
  CREATE INDEX "provinces_minister_photo_idx" ON "provinces" USING btree ("minister_photo_id");
  CREATE INDEX "provinces_updated_at_idx" ON "provinces" USING btree ("updated_at");
  CREATE INDEX "provinces_created_at_idx" ON "provinces" USING btree ("created_at");
  CREATE UNIQUE INDEX "resources_key_idx" ON "resources" USING btree ("key");
  CREATE INDEX "resources_cover_idx" ON "resources" USING btree ("cover_id");
  CREATE INDEX "resources_file_idx" ON "resources" USING btree ("file_id");
  CREATE INDEX "resources_order_idx" ON "resources" USING btree ("order");
  CREATE INDEX "resources_updated_at_idx" ON "resources" USING btree ("updated_at");
  CREATE INDEX "resources_created_at_idx" ON "resources" USING btree ("created_at");
  CREATE INDEX "funding_programs_need_order_idx" ON "funding_programs_need" USING btree ("order");
  CREATE INDEX "funding_programs_need_parent_idx" ON "funding_programs_need" USING btree ("parent_id");
  CREATE INDEX "funding_programs_order_idx" ON "funding_programs" USING btree ("order");
  CREATE INDEX "funding_programs_updated_at_idx" ON "funding_programs" USING btree ("updated_at");
  CREATE INDEX "funding_programs_created_at_idx" ON "funding_programs" USING btree ("created_at");
  CREATE INDEX "offers_logo_idx" ON "offers" USING btree ("logo_id");
  CREATE INDEX "offers_expires_at_idx" ON "offers" USING btree ("expires_at");
  CREATE INDEX "offers_order_idx" ON "offers" USING btree ("order");
  CREATE INDEX "offers_updated_at_idx" ON "offers" USING btree ("updated_at");
  CREATE INDEX "offers_created_at_idx" ON "offers" USING btree ("created_at");
  CREATE INDEX "legal_pages_sections_ps_order_idx" ON "legal_pages_sections_ps" USING btree ("_order");
  CREATE INDEX "legal_pages_sections_ps_parent_id_idx" ON "legal_pages_sections_ps" USING btree ("_parent_id");
  CREATE INDEX "legal_pages_sections_items_order_idx" ON "legal_pages_sections_items" USING btree ("_order");
  CREATE INDEX "legal_pages_sections_items_parent_id_idx" ON "legal_pages_sections_items" USING btree ("_parent_id");
  CREATE INDEX "legal_pages_sections_order_idx" ON "legal_pages_sections" USING btree ("_order");
  CREATE INDEX "legal_pages_sections_parent_id_idx" ON "legal_pages_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "legal_pages" USING btree ("slug");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");
  CREATE INDEX "submissions_type_idx" ON "submissions" USING btree ("type");
  CREATE INDEX "submissions_email_idx" ON "submissions" USING btree ("email");
  CREATE INDEX "submissions_ip_hash_idx" ON "submissions" USING btree ("ip_hash");
  CREATE INDEX "submissions_status_idx" ON "submissions" USING btree ("status");
  CREATE INDEX "submissions_updated_at_idx" ON "submissions" USING btree ("updated_at");
  CREATE INDEX "submissions_created_at_idx" ON "submissions" USING btree ("created_at");
  CREATE INDEX "homepage_slides_order_idx" ON "homepage_slides" USING btree ("_order");
  CREATE INDEX "homepage_slides_parent_id_idx" ON "homepage_slides" USING btree ("_parent_id");
  CREATE INDEX "homepage_slides_logo_idx" ON "homepage_slides" USING btree ("logo_id");
  CREATE INDEX "homepage_slides_image_idx" ON "homepage_slides" USING btree ("image_id");
  CREATE INDEX "homepage_secondary_order_idx" ON "homepage_secondary" USING btree ("_order");
  CREATE INDEX "homepage_secondary_parent_id_idx" ON "homepage_secondary" USING btree ("_parent_id");
  CREATE INDEX "homepage_secondary_post_idx" ON "homepage_secondary" USING btree ("post_id");
  CREATE INDEX "homepage_secondary_image_idx" ON "homepage_secondary" USING btree ("image_id");
  CREATE INDEX "homepage_ai_topic_more_order_idx" ON "homepage_ai_topic_more" USING btree ("_order");
  CREATE INDEX "homepage_ai_topic_more_parent_id_idx" ON "homepage_ai_topic_more" USING btree ("_parent_id");
  CREATE INDEX "homepage_ai_topic_more_post_idx" ON "homepage_ai_topic_more" USING btree ("post_id");
  CREATE INDEX "homepage_ai_topic_more_image_idx" ON "homepage_ai_topic_more" USING btree ("image_id");
  CREATE INDEX "homepage_most_read_order_idx" ON "homepage_most_read" USING btree ("_order");
  CREATE INDEX "homepage_most_read_parent_id_idx" ON "homepage_most_read" USING btree ("_parent_id");
  CREATE INDEX "homepage_most_read_post_idx" ON "homepage_most_read" USING btree ("post_id");
  CREATE INDEX "homepage_topic_cards_order_idx" ON "homepage_topic_cards" USING btree ("_order");
  CREATE INDEX "homepage_topic_cards_parent_id_idx" ON "homepage_topic_cards" USING btree ("_parent_id");
  CREATE INDEX "homepage_communities_more_order_idx" ON "homepage_communities_more" USING btree ("_order");
  CREATE INDEX "homepage_communities_more_parent_id_idx" ON "homepage_communities_more" USING btree ("_parent_id");
  CREATE INDEX "homepage_communities_more_post_idx" ON "homepage_communities_more" USING btree ("post_id");
  CREATE INDEX "homepage_communities_order_idx" ON "homepage_communities" USING btree ("_order");
  CREATE INDEX "homepage_communities_parent_id_idx" ON "homepage_communities" USING btree ("_parent_id");
  CREATE INDEX "homepage_communities_category_idx" ON "homepage_communities" USING btree ("category_id");
  CREATE INDEX "homepage_communities_lead_lead_post_idx" ON "homepage_communities" USING btree ("lead_post_id");
  CREATE INDEX "homepage_communities_lead_lead_image_idx" ON "homepage_communities" USING btree ("lead_image_id");
  CREATE INDEX "homepage_tools_order_idx" ON "homepage_tools" USING btree ("_order");
  CREATE INDEX "homepage_tools_parent_id_idx" ON "homepage_tools" USING btree ("_parent_id");
  CREATE INDEX "homepage_finder_needs_order_idx" ON "homepage_finder_needs" USING btree ("_order");
  CREATE INDEX "homepage_finder_needs_parent_id_idx" ON "homepage_finder_needs" USING btree ("_parent_id");
  CREATE INDEX "homepage_programs_order_idx" ON "homepage_programs" USING btree ("_order");
  CREATE INDEX "homepage_programs_parent_id_idx" ON "homepage_programs" USING btree ("_parent_id");
  CREATE INDEX "homepage_programs_photo_idx" ON "homepage_programs" USING btree ("photo_id");
  CREATE INDEX "homepage_hero_hero_post_idx" ON "homepage" USING btree ("hero_post_id");
  CREATE INDEX "homepage_hero_hero_image_idx" ON "homepage" USING btree ("hero_image_id");
  CREATE INDEX "homepage_ai_topic_lead_ai_topic_lead_post_idx" ON "homepage" USING btree ("ai_topic_lead_post_id");
  CREATE INDEX "homepage_ai_topic_lead_ai_topic_lead_image_idx" ON "homepage" USING btree ("ai_topic_lead_image_id");
  CREATE INDEX "homepage_spotlight_spotlight_post_idx" ON "homepage" USING btree ("spotlight_post_id");
  CREATE INDEX "homepage_spotlight_spotlight_image_idx" ON "homepage" USING btree ("spotlight_image_id");
  CREATE INDEX "homepage_wotm_wotm_post_idx" ON "homepage" USING btree ("wotm_post_id");
  CREATE INDEX "homepage_wotm_wotm_image_idx" ON "homepage" USING btree ("wotm_image_id");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_categories_id_idx" ON "homepage_rels" USING btree ("categories_id");
  CREATE INDEX "ads_slots_order_idx" ON "ads_slots" USING btree ("_order");
  CREATE INDEX "ads_slots_parent_id_idx" ON "ads_slots" USING btree ("_parent_id");
  CREATE INDEX "ads_slots_image_idx" ON "ads_slots" USING btree ("image_id");
  CREATE INDEX "ads_partners_order_idx" ON "ads_partners" USING btree ("_order");
  CREATE INDEX "ads_partners_parent_id_idx" ON "ads_partners" USING btree ("_parent_id");
  CREATE INDEX "ads_partners_logo_idx" ON "ads_partners" USING btree ("logo_id");
  CREATE INDEX "advertise_metrics_order_idx" ON "advertise_metrics" USING btree ("_order");
  CREATE INDEX "advertise_metrics_parent_id_idx" ON "advertise_metrics" USING btree ("_parent_id");
  CREATE INDEX "advertise_audience_order_idx" ON "advertise_audience" USING btree ("_order");
  CREATE INDEX "advertise_audience_parent_id_idx" ON "advertise_audience" USING btree ("_parent_id");
  CREATE INDEX "advertise_options_order_idx" ON "advertise_options" USING btree ("_order");
  CREATE INDEX "advertise_options_parent_id_idx" ON "advertise_options" USING btree ("_parent_id");
  CREATE INDEX "advertise_goals_order_idx" ON "advertise_goals" USING btree ("_order");
  CREATE INDEX "advertise_goals_parent_id_idx" ON "advertise_goals" USING btree ("_parent_id");
  CREATE INDEX "advertise_why_order_idx" ON "advertise_why" USING btree ("_order");
  CREATE INDEX "advertise_why_parent_id_idx" ON "advertise_why" USING btree ("_parent_id");
  CREATE INDEX "advertise_faq_order_idx" ON "advertise_faq" USING btree ("_order");
  CREATE INDEX "advertise_faq_parent_id_idx" ON "advertise_faq" USING btree ("_parent_id");
  CREATE INDEX "advertise_interests_order_idx" ON "advertise_interests" USING btree ("_order");
  CREATE INDEX "advertise_interests_parent_id_idx" ON "advertise_interests" USING btree ("_parent_id");
  CREATE INDEX "advertise_budgets_order_idx" ON "advertise_budgets" USING btree ("_order");
  CREATE INDEX "advertise_budgets_parent_id_idx" ON "advertise_budgets" USING btree ("_parent_id");
  CREATE INDEX "advertise_timing_order_idx" ON "advertise_timing" USING btree ("_order");
  CREATE INDEX "advertise_timing_parent_id_idx" ON "advertise_timing" USING btree ("_parent_id");
  CREATE INDEX "advertise_media_kit_idx" ON "advertise" USING btree ("media_kit_id");
  CREATE INDEX "site_settings_sister_titles_order_idx" ON "site_settings_sister_titles" USING btree ("_order");
  CREATE INDEX "site_settings_sister_titles_parent_id_idx" ON "site_settings_sister_titles" USING btree ("_parent_id");
  CREATE INDEX "site_settings_sitemap_groups_links_order_idx" ON "site_settings_sitemap_groups_links" USING btree ("_order");
  CREATE INDEX "site_settings_sitemap_groups_links_parent_id_idx" ON "site_settings_sitemap_groups_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_sitemap_groups_order_idx" ON "site_settings_sitemap_groups" USING btree ("_order");
  CREATE INDEX "site_settings_sitemap_groups_parent_id_idx" ON "site_settings_sitemap_groups" USING btree ("_parent_id");
  CREATE INDEX "navigation_mega_menus_cols_links_order_idx" ON "navigation_mega_menus_cols_links" USING btree ("_order");
  CREATE INDEX "navigation_mega_menus_cols_links_parent_id_idx" ON "navigation_mega_menus_cols_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_mega_menus_cols_order_idx" ON "navigation_mega_menus_cols" USING btree ("_order");
  CREATE INDEX "navigation_mega_menus_cols_parent_id_idx" ON "navigation_mega_menus_cols" USING btree ("_parent_id");
  CREATE INDEX "navigation_mega_menus_order_idx" ON "navigation_mega_menus" USING btree ("_order");
  CREATE INDEX "navigation_mega_menus_parent_id_idx" ON "navigation_mega_menus" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_deadlines_fk" FOREIGN KEY ("deadlines_id") REFERENCES "public"."deadlines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_magazine_issues_fk" FOREIGN KEY ("magazine_issues_id") REFERENCES "public"."magazine_issues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_podcast_episodes_fk" FOREIGN KEY ("podcast_episodes_id") REFERENCES "public"."podcast_episodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_provinces_fk" FOREIGN KEY ("provinces_id") REFERENCES "public"."provinces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_funding_programs_fk" FOREIGN KEY ("funding_programs_id") REFERENCES "public"."funding_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_submissions_fk" FOREIGN KEY ("submissions_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_editor_author_id_authors_id_fk" FOREIGN KEY ("editor_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_deadlines_id_idx" ON "payload_locked_documents_rels" USING btree ("deadlines_id");
  CREATE INDEX "payload_locked_documents_rels_magazine_issues_id_idx" ON "payload_locked_documents_rels" USING btree ("magazine_issues_id");
  CREATE INDEX "payload_locked_documents_rels_podcast_episodes_id_idx" ON "payload_locked_documents_rels" USING btree ("podcast_episodes_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_provinces_id_idx" ON "payload_locked_documents_rels" USING btree ("provinces_id");
  CREATE INDEX "payload_locked_documents_rels_resources_id_idx" ON "payload_locked_documents_rels" USING btree ("resources_id");
  CREATE INDEX "payload_locked_documents_rels_funding_programs_id_idx" ON "payload_locked_documents_rels" USING btree ("funding_programs_id");
  CREATE INDEX "payload_locked_documents_rels_offers_id_idx" ON "payload_locked_documents_rels" USING btree ("offers_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");
  CREATE INDEX "payload_locked_documents_rels_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("submissions_id");
  CREATE INDEX "site_settings_editor_author_idx" ON "site_settings" USING btree ("editor_author_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "navigation_header_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"new_tab" boolean
  );
  
  CREATE TABLE "navigation_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"new_tab" boolean
  );
  
  CREATE TABLE "navigation_footer_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"new_tab" boolean
  );
  
  CREATE TABLE "navigation_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"new_tab" boolean
  );
  
  ALTER TABLE "deadlines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "magazine_issues_inside" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "magazine_issues" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_magazine_issues_v_version_inside" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_magazine_issues_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "podcast_episodes_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "podcast_episodes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_podcast_episodes_v_version_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_podcast_episodes_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_expect" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_version_expect" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "provinces_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "provinces_watch" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "provinces_comply" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "provinces_fund" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "provinces_about_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "provinces_start" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "provinces_article_sections_ps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "provinces_article_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "provinces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "funding_programs_need" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "funding_programs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages_sections_ps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages_sections_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_secondary" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_ai_topic_more" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_most_read" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_topic_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_communities_more" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_communities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_tools" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_finder_needs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_programs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ads_slots" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ads_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "advertise_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "advertise_audience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "advertise_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "advertise_goals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "advertise_why" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "advertise_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "advertise_interests" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "advertise_budgets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "advertise_timing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "advertise" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_sister_titles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_sitemap_groups_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_sitemap_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_mega_menus_cols_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_mega_menus_cols" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_mega_menus" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "deadlines" CASCADE;
  DROP TABLE "magazine_issues_inside" CASCADE;
  DROP TABLE "magazine_issues" CASCADE;
  DROP TABLE "_magazine_issues_v_version_inside" CASCADE;
  DROP TABLE "_magazine_issues_v" CASCADE;
  DROP TABLE "podcast_episodes_notes" CASCADE;
  DROP TABLE "podcast_episodes" CASCADE;
  DROP TABLE "_podcast_episodes_v_version_notes" CASCADE;
  DROP TABLE "_podcast_episodes_v" CASCADE;
  DROP TABLE "events_expect" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "_events_v_version_expect" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "provinces_facts" CASCADE;
  DROP TABLE "provinces_watch" CASCADE;
  DROP TABLE "provinces_comply" CASCADE;
  DROP TABLE "provinces_fund" CASCADE;
  DROP TABLE "provinces_about_stats" CASCADE;
  DROP TABLE "provinces_start" CASCADE;
  DROP TABLE "provinces_article_sections_ps" CASCADE;
  DROP TABLE "provinces_article_sections" CASCADE;
  DROP TABLE "provinces" CASCADE;
  DROP TABLE "resources" CASCADE;
  DROP TABLE "funding_programs_need" CASCADE;
  DROP TABLE "funding_programs" CASCADE;
  DROP TABLE "offers" CASCADE;
  DROP TABLE "legal_pages_sections_ps" CASCADE;
  DROP TABLE "legal_pages_sections_items" CASCADE;
  DROP TABLE "legal_pages_sections" CASCADE;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "submissions" CASCADE;
  DROP TABLE "homepage_slides" CASCADE;
  DROP TABLE "homepage_secondary" CASCADE;
  DROP TABLE "homepage_ai_topic_more" CASCADE;
  DROP TABLE "homepage_most_read" CASCADE;
  DROP TABLE "homepage_topic_cards" CASCADE;
  DROP TABLE "homepage_communities_more" CASCADE;
  DROP TABLE "homepage_communities" CASCADE;
  DROP TABLE "homepage_tools" CASCADE;
  DROP TABLE "homepage_finder_needs" CASCADE;
  DROP TABLE "homepage_programs" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;
  DROP TABLE "ads_slots" CASCADE;
  DROP TABLE "ads_partners" CASCADE;
  DROP TABLE "ads" CASCADE;
  DROP TABLE "advertise_metrics" CASCADE;
  DROP TABLE "advertise_audience" CASCADE;
  DROP TABLE "advertise_options" CASCADE;
  DROP TABLE "advertise_goals" CASCADE;
  DROP TABLE "advertise_why" CASCADE;
  DROP TABLE "advertise_faq" CASCADE;
  DROP TABLE "advertise_interests" CASCADE;
  DROP TABLE "advertise_budgets" CASCADE;
  DROP TABLE "advertise_timing" CASCADE;
  DROP TABLE "advertise" CASCADE;
  DROP TABLE "site_settings_sister_titles" CASCADE;
  DROP TABLE "site_settings_sitemap_groups_links" CASCADE;
  DROP TABLE "site_settings_sitemap_groups" CASCADE;
  DROP TABLE "navigation_mega_menus_cols_links" CASCADE;
  DROP TABLE "navigation_mega_menus_cols" CASCADE;
  DROP TABLE "navigation_mega_menus" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_deadlines_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_magazine_issues_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_podcast_episodes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_provinces_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_resources_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_funding_programs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_offers_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_legal_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_submissions_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_editor_author_id_authors_id_fk";
  
  DROP INDEX "payload_locked_documents_rels_deadlines_id_idx";
  DROP INDEX "payload_locked_documents_rels_magazine_issues_id_idx";
  DROP INDEX "payload_locked_documents_rels_podcast_episodes_id_idx";
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_provinces_id_idx";
  DROP INDEX "payload_locked_documents_rels_resources_id_idx";
  DROP INDEX "payload_locked_documents_rels_funding_programs_id_idx";
  DROP INDEX "payload_locked_documents_rels_offers_id_idx";
  DROP INDEX "payload_locked_documents_rels_legal_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_submissions_id_idx";
  DROP INDEX "site_settings_editor_author_idx";
  ALTER TABLE "site_settings" ALTER COLUMN "subscribe_url" SET DEFAULT '/subscription/';
  ALTER TABLE "navigation_header_children" ADD CONSTRAINT "navigation_header_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header" ADD CONSTRAINT "navigation_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_children" ADD CONSTRAINT "navigation_footer_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer" ADD CONSTRAINT "navigation_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "navigation_header_children_order_idx" ON "navigation_header_children" USING btree ("_order");
  CREATE INDEX "navigation_header_children_parent_id_idx" ON "navigation_header_children" USING btree ("_parent_id");
  CREATE INDEX "navigation_header_order_idx" ON "navigation_header" USING btree ("_order");
  CREATE INDEX "navigation_header_parent_id_idx" ON "navigation_header" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_children_order_idx" ON "navigation_footer_children" USING btree ("_order");
  CREATE INDEX "navigation_footer_children_parent_id_idx" ON "navigation_footer_children" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_order_idx" ON "navigation_footer" USING btree ("_order");
  CREATE INDEX "navigation_footer_parent_id_idx" ON "navigation_footer" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "deadlines_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "magazine_issues_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "podcast_episodes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "provinces_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "resources_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "funding_programs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "offers_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "legal_pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "submissions_id";
  ALTER TABLE "site_settings" DROP COLUMN "social_spotify";
  ALTER TABLE "site_settings" DROP COLUMN "social_apple";
  ALTER TABLE "site_settings" DROP COLUMN "social_podcast_youtube";
  ALTER TABLE "site_settings" DROP COLUMN "editor_author_id";
  ALTER TABLE "site_settings" DROP COLUMN "latest_issue_href";
  DROP TYPE "public"."enum_magazine_issues_status";
  DROP TYPE "public"."enum__magazine_issues_v_version_status";
  DROP TYPE "public"."enum_podcast_episodes_status";
  DROP TYPE "public"."enum__podcast_episodes_v_version_status";
  DROP TYPE "public"."enum_events_event_status";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum_provinces_code";
  DROP TYPE "public"."enum_resources_group";
  DROP TYPE "public"."enum_funding_programs_need";
  DROP TYPE "public"."enum_legal_pages_slug";
  DROP TYPE "public"."enum_submissions_type";
  DROP TYPE "public"."enum_submissions_status";
  DROP TYPE "public"."enum_ads_slots_slot";
  DROP TYPE "public"."enum_navigation_mega_menus_key";`)
}
