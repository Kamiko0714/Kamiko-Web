# --- 1. RESOURCES UNTUK NODE RUMAH (i3-8100) ---

# Tunnel untuk Node 1 (Frontend Dev - SSD)
resource "cloudflare_zero_trust_tunnel_cloudflared" "node1_tunnel" {
  account_id = var.cloudflare_account_id
  name       = "node-1"
  secret     = var.tunnel_secret
}

# Tunnel untuk Node 2 (Backend & QA - HDD)
resource "cloudflare_zero_trust_tunnel_cloudflared" "node2_tunnel" {
  account_id = var.cloudflare_account_id
  name       = "node-2"
  secret     = var.tunnel_secret
}

# DNS Record untuk aplikasi (Frontend)
resource "cloudflare_record" "frontend_dns" {
  zone_id = var.cloudflare_zone_id
  name    = "app.kamiko.dev"
  content = "${cloudflare_zero_trust_tunnel_cloudflared.node1_tunnel.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
}

# DNS Record untuk API/Gitea (Backend)
resource "cloudflare_record" "backend_dns" {
  zone_id = var.cloudflare_zone_id
  name    = "api.kamiko.dev"
  content = "${cloudflare_zero_trust_tunnel_cloudflared.node2_tunnel.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
}


# --- 2. RESOURCES UNTUK AZURE CLOUD ---

# Password generator untuk secret tunnel Azure
resource "random_password" "azure_tunnel_secret" {
  length  = 32
  special = false
}

# Tunnel untuk Azure Witness Server
resource "cloudflare_zero_trust_tunnel_cloudflared" "azure_tunnel" {
  account_id = var.cloudflare_account_id
  name       = "azure-witness-server"
  secret     = base64encode(random_password.azure_tunnel_secret.result)
}

# DNS untuk Witness Server
resource "cloudflare_record" "azure_dns" {
  zone_id = var.cloudflare_zone_id
  name    = "witness"
  content = "${cloudflare_zero_trust_tunnel_cloudflared.azure_tunnel.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
}

# DNS untuk Status Page (Hosted di Azure)
resource "cloudflare_record" "status_page" {
  zone_id = var.cloudflare_zone_id
  name    = "status"
  content = "${cloudflare_zero_trust_tunnel_cloudflared.azure_tunnel.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
}