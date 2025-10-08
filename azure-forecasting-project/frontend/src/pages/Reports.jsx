import React from 'react'
import {
  FileText,
  Download,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3
} from 'lucide-react'

import { jsPDF } from 'jspdf'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default function Reports() {
  const recommendations = [
    {
      priority: 'high',
      title: 'Scale CPU Resources',
      description:
        'Peak usage indicates need for additional capacity during high-demand periods.',
      action: 'Consider adding 2-3 more instances'
    },
    {
      priority: 'medium',
      title: 'Optimize Storage Distribution',
      description: 'East US region approaching capacity limits.',
      action: 'Implement data archival policy'
    },
    {
      priority: 'low',
      title: 'Review Weekend Patterns',
      description: 'Weekend usage shows different patterns from weekdays.',
      action: 'Adjust scaling policies for weekends'
    }
  ]

  const insights = [
    {
      metric: 'Cost Optimization',
      value: '15-20%',
      description: 'Potential savings through better resource allocation',
      icon: TrendingUp,
      iconColor: '#10b981' // Green
    },
    {
      metric: 'Peak Efficiency',
      value: '82%',
      description: 'Current utilization during peak hours',
      icon: CheckCircle,
      iconColor: '#3b82f6' // Blue
    },
    {
      metric: 'Risk Level',
      value: 'Low',
      description: 'No immediate capacity concerns detected',
      icon: CheckCircle,
      iconColor: '#10b981' // Green
    }
  ]

  const baseContainer = {
    minHeight: '100vh',
    backgroundColor: 'transparent',
    padding: '2rem 1rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    lineHeight: 1.6
  }
  const maxWidthContainer = { maxWidth: '80rem', margin: '0 auto' }
  const header = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#e4e4e7',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.25rem'
  }
  const subHeader = {
    color: '#a1a1aa',
    fontSize: '1.125rem',
    fontWeight: '500',
    marginBottom: '1rem'
  }
  const buttonPrimary = {
    backgroundColor: '#93c5fd', // Lighter blue
    color: '#0d1117',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 'bold'
  }
  const buttonSecondary = {
    backgroundColor: '#3b82f6', // Darker blue
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 'bold'
  }
  const sectionTitle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    marginTop: '2rem',
    color: '#e4e4e7'
  }
  const cardBase = {
    borderRadius: '0.75rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    padding: '1.5rem',
    marginBottom: '1rem',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255,255,255,0.1)',
  }
  const priorityStyles = {
    high: {
      borderLeft: '4px solid #f87171',
      backgroundColor: 'transparent',
      color: '#f87171'
    },
    medium: {
      borderLeft: '4px solid #fcd34d',
      backgroundColor: 'transparent',
      color: '#fcd34d'
    },
    low: {
      borderLeft: '4px solid #60a5fa',
      backgroundColor: 'transparent',
      color: '#60a5fa'
    }
  }
  const badgeStyles = {
    high: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      borderRadius: '9999px',
      padding: '0.25rem 0.75rem',
      fontWeight: '600',
      fontSize: '0.75rem',
      display: 'inline-block',
      marginBottom: '0.5rem'
    },
    medium: {
      backgroundColor: '#fef3c7',
      color: '#92400e',
      borderRadius: '9999px',
      padding: '0.25rem 0.75rem',
      fontWeight: '600',
      fontSize: '0.75rem',
      display: 'inline-block',
      marginBottom: '0.5rem'
    },
    low: {
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      borderRadius: '9999px',
      padding: '0.25rem 0.75rem',
      fontWeight: '600',
      fontSize: '0.75rem',
      display: 'inline-block',
      marginBottom: '0.5rem'
    }
  }
  const insightCard = {
    ...cardBase,
    backgroundColor: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem'
  }
  const insightIconWrapper = (color) => ({
    height: '3rem',
    width: '3rem',
    borderRadius: '9999px',
    backgroundColor: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    flexShrink: 0
  })
  const insightContent = {
    flex: '1 1 auto'
  }
  const insightTitle = {
    fontWeight: '700',
    fontSize: '1.125rem',
    marginBottom: '0.25rem',
    color: '#e4e4e7'
  }
  const insightDescription = {
    color: '#a1a1aa',
    fontSize: '0.875rem'
  }

  // PDF export logic
  const handleExportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text('Capacity Reports', 10, 20)
    doc.setFontSize(14)
    doc.text('Executive Summary', 10, 30)

    let y = 40
    insights.forEach((item) => {
      doc.setFontSize(12)
      doc.text(`${item.metric}: ${item.value}`, 10, y)
      y += 7
      doc.setFontSize(10)
      doc.text(item.description, 10, y)
      y += 10
    })

    y += 5
    doc.setFontSize(14)
    doc.text('Capacity Recommendations', 10, y)
    y += 10

    recommendations.forEach((rec) => {
      doc.setFontSize(12)
      doc.text(`${rec.priority.toUpperCase()}: ${rec.title}`, 10, y)
      y += 7
      doc.setFontSize(10)
      doc.text(rec.description, 10, y)
      y += 7
      doc.text(`Action: ${rec.action}`, 10, y)
      y += 10
    })

    doc.save('capacity-report.pdf')
  }

  // Excel export logic
  const handleExportExcel = () => {
    const data = [
      ['Metric', 'Value', 'Description'],
      ...insights.map((i) => [i.metric, i.value, i.description]),
      [],
      ['Priority', 'Title', 'Description', 'Action'],
      ...recommendations.map((r) => [r.priority, r.title, r.description, r.action])
    ]

    const worksheet = XLSX.utils.aoa_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Capacity Report')

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'capacity-report.xlsx')
  }

  return (
    <div style={baseContainer}>
      <div style={maxWidthContainer}>
        {/* Header */}
        <h1 style={header}>
          <FileText size={36} />
          Capacity Reports
        </h1>
        <p style={subHeader}>Forecast-driven scaling insights & actions</p>

        {/* Export Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={handleExportPDF} style={buttonPrimary}>
            <Download />
            Export PDF
          </button>
          <button onClick={handleExportExcel} style={buttonSecondary}>
            <Download />
            Export Excel
          </button>
        </div>

        {/* Insights */}
        <section>
          <h2 style={sectionTitle}>Executive Summary</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {insights.map((insight, idx) => {
              const Icon = insight.icon
              return (
                <div key={idx} style={insightCard}>
                  <div style={insightIconWrapper(insight.iconColor)}>
                    <Icon size={24} />
                  </div>
                  <div style={insightContent}>
                    <h3 style={insightTitle}>
                      {insight.metric}
                    </h3>
                    <p style={insightDescription}>{insight.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <h2 style={sectionTitle}>Capacity Recommendations</h2>
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              style={{
                ...cardBase,
                ...priorityStyles[rec.priority],
                borderLeftWidth: '6px',
                marginBottom: '1rem'
              }}
            >
              <div style={badgeStyles[rec.priority]}>
                {rec.priority.toUpperCase()}
              </div>
              <h3
                style={{
                  fontWeight: '700',
                  fontSize: '1.25rem',
                  marginBottom: '0.25rem',
                  color: "#e4e4e7"
                }}
              >
                {rec.title}
              </h3>
              <p style={{ marginBottom: '0.5rem' }}>{rec.description}</p>
              <p style={{ fontStyle: 'italic', fontWeight: '600' }}>
                Action: {rec.action}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}